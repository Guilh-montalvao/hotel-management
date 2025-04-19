"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BedDoubleIcon,
  FilterIcon,
  RefreshCwIcon,
  SearchIcon,
  WrenchIcon,
  XCircleIcon,
  CalendarPlusIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { AddRoomDialog } from "./add-room-dialog";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { RoomDetailsDialog } from "./room-details-dialog";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(roomData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(roomData);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const router = useRouter();

  const handleAddRoom = (newRoom: Room) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    toast({
      title: "Quarto adicionado",
      description: `Quarto ${newRoom.number} foi adicionado com sucesso.`,
    });
  };

  // Função para limpar os filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Filtrar os quartos de acordo com os critérios
  useEffect(() => {
    let result = [...rooms];

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      result = result.filter(
        (room) =>
          room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de status
    if (statusFilter !== "all") {
      result = result.filter((room) => {
        if (statusFilter === "available") return room.status === "Available";
        if (statusFilter === "occupied") return room.status === "Occupied";
        if (statusFilter === "maintenance")
          return room.status === "Maintenance";
        if (statusFilter === "cleaning") return room.status === "Cleaning";
        return true;
      });
    }

    setFilteredRooms(result);
  }, [rooms, searchTerm, statusFilter]);

  // Função para tratar a exclusão de um quarto
  const handleDeleteRoom = (roomNumber: string) => {
    // Verificar se o quarto está ocupado ou reservado
    const room = rooms.find((r) => r.number === roomNumber);

    if (room?.status === "Occupied") {
      toast({
        title: "Não foi possível excluir",
        description: "Não é possível excluir um quarto que está ocupado.",
        variant: "destructive",
      });
      return;
    }

    // Se passou na verificação, excluir o quarto
    setRooms(rooms.filter((r) => r.number !== roomNumber));
    toast({
      title: "Quarto excluído",
      description: `Quarto ${roomNumber} foi excluído com sucesso.`,
    });
  };

  // Função para abrir o diálogo de detalhes do quarto
  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setDetailsOpen(true);
  };

  // Função para lidar com o botão "Reservar"
  const handleBookRoom = (room: Room) => {
    // Redireciona para a página de reservas com os parâmetros do quarto
    router.push(`/bookings?room=${room.number}&type=${room.type}&action=new`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Quartos</h1>
        <div className="flex items-center gap-2">
          {(searchTerm || statusFilter !== "all") && (
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              <XCircleIcon className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          )}
          <AddRoomDialog onAddRoom={handleAddRoom} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Quartos
            </CardTitle>
            <BedDoubleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rooms.length}</div>
            <p className="text-xs text-muted-foreground">
              Todos os quartos do hotel
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
            >
              Disponível
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.filter((r) => r.status === "Available").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Prontos para reserva
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ocupados</CardTitle>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
            >
              Ocupado
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.filter((r) => r.status === "Occupied").length}
            </div>
            <p className="text-xs text-muted-foreground">Em uso no momento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manutenção</CardTitle>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
            >
              Manutenção
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {rooms.filter((r) => r.status === "Maintenance").length}
            </div>
            <p className="text-xs text-muted-foreground">Em reparo</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Status dos Quartos</CardTitle>
                <CardDescription>
                  Gerencie e atualize o status dos quartos
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Pesquisar quartos..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="occupied">Ocupado</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                    <SelectItem value="cleaning">Limpeza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Todos os Quartos</TabsTrigger>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
                <TabsTrigger value="suite">Suíte</TabsTrigger>
              </TabsList>
              {filteredRooms.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Nenhum quarto encontrado</AlertTitle>
                  <AlertDescription>
                    Não há quartos que correspondem aos critérios de filtro
                    aplicados.
                  </AlertDescription>
                </Alert>
              ) : (
                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRooms.map((room) => (
                      <RoomCard
                        key={room.number}
                        room={room}
                        onDelete={() => handleDeleteRoom(room.number)}
                        onViewDetails={() => handleViewDetails(room)}
                        onBookRoom={() => handleBookRoom(room)}
                      />
                    ))}
                  </div>
                </TabsContent>
              )}
              <TabsContent value="standard" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRooms
                    .filter((room) => room.type === "Standard")
                    .map((room) => (
                      <RoomCard
                        key={room.number}
                        room={room}
                        onDelete={() => handleDeleteRoom(room.number)}
                        onViewDetails={() => handleViewDetails(room)}
                        onBookRoom={() => handleBookRoom(room)}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="deluxe" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRooms
                    .filter((room) => room.type === "Deluxe")
                    .map((room) => (
                      <RoomCard
                        key={room.number}
                        room={room}
                        onDelete={() => handleDeleteRoom(room.number)}
                        onViewDetails={() => handleViewDetails(room)}
                        onBookRoom={() => handleBookRoom(room)}
                      />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="suite" className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredRooms
                    .filter((room) => room.type === "Suite")
                    .map((room) => (
                      <RoomCard
                        key={room.number}
                        room={room}
                        onDelete={() => handleDeleteRoom(room.number)}
                        onViewDetails={() => handleViewDetails(room)}
                        onBookRoom={() => handleBookRoom(room)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {selectedRoom && (
        <RoomDetailsDialog
          room={selectedRoom}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onBookRoom={() => {
            setDetailsOpen(false);
            handleBookRoom(selectedRoom);
          }}
        />
      )}
    </div>
  );
}

interface RoomCardProps {
  room: Room;
  onDelete: () => void;
  onViewDetails: () => void;
  onBookRoom: () => void;
}

function RoomCard({
  room,
  onDelete,
  onViewDetails,
  onBookRoom,
}: RoomCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative bg-muted">
        <img
          src={room.image || "/placeholder.svg?height=200&width=400"}
          alt={`Room ${room.number}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
          <Badge
            variant="outline"
            className={
              room.status === "Available"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                : room.status === "Occupied"
                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
            }
          >
            {room.status === "Available"
              ? "Disponível"
              : room.status === "Occupied"
              ? "Ocupado"
              : "Manutenção"}
          </Badge>
        </div>
      </div>
      <CardHeader className="py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="font-medium">Quarto {room.number}</CardTitle>
          <Badge variant="secondary">{room.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium">R$ {room.rate}</div>
          <div className="text-sm text-muted-foreground">
            {room.type === "Standard"
              ? "Quarto padrão"
              : room.type === "Deluxe"
              ? "Quarto luxo"
              : "Suíte executiva"}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 h-9">
          {room.description || "Sem descrição disponível"}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewDetails}
          >
            Ver Detalhes
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={onBookRoom}
            disabled={room.status !== "Available"}
          >
            <CalendarPlusIcon className="mr-2 h-4 w-4" />
            Reservar
          </Button>
        </div>
        <div className="mt-2">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={onDelete}
            disabled={room.status === "Occupied"}
          >
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Dados de exemplo
interface Room {
  number: string;
  type: "Standard" | "Deluxe" | "Suite";
  status: "Available" | "Occupied" | "Maintenance" | "Cleaning";
  rate: number;
  description: string;
  image?: string;
}

const roomData: Room[] = [
  {
    number: "101",
    type: "Standard",
    status: "Available",
    rate: 100,
    description: "Quarto standard com cama de casal, ar-condicionado e TV.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop",
  },
  {
    number: "102",
    type: "Standard",
    status: "Occupied",
    rate: 100,
    description:
      "Quarto standard com duas camas de solteiro, vista para a cidade.",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000&auto=format&fit=crop",
  },
  {
    number: "201",
    type: "Deluxe",
    status: "Available",
    rate: 150,
    description:
      "Quarto deluxe com cama king size, varanda e vista para o mar.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop",
  },
  {
    number: "202",
    type: "Deluxe",
    status: "Maintenance",
    rate: 150,
    description: "Quarto deluxe com cama queen, área de trabalho e frigobar.",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    number: "301",
    type: "Suite",
    status: "Available",
    rate: 200,
    description: "Suíte com sala de estar, jacuzzi e vista panorâmica.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    number: "302",
    type: "Suite",
    status: "Occupied",
    rate: 200,
    description:
      "Suíte presidencial com sala de jantar, bar e terraço privativo.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
  },
];

// Tamanhos dos quartos (para exibição no RoomDetailsDialog)
export const roomSizes = {
  Standard: "20m²",
  Deluxe: "30m²",
  Suite: "45m²",
};
