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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Quartos</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
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
              <TabsContent value="all" className="space-y-4">
                {filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms.map((room) => (
                      <RoomCard
                        key={room.number}
                        room={room}
                        onDelete={handleDeleteRoom}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-4 flex flex-col items-center justify-center gap-2">
                    <Alert variant="destructive" className="max-w-md">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Nenhum quarto encontrado</AlertTitle>
                      <AlertDescription>
                        Nenhum quarto corresponde aos filtros aplicados.
                      </AlertDescription>
                    </Alert>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="mt-2"
                    >
                      <XCircleIcon className="mr-2 h-4 w-4" />
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="standard" className="space-y-4">
                {filteredRooms.filter((room) => room.type === "Standard")
                  .length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms
                      .filter((room) => room.type === "Standard")
                      .map((room) => (
                        <RoomCard
                          key={room.number}
                          room={room}
                          onDelete={handleDeleteRoom}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="p-4 flex flex-col items-center justify-center gap-2">
                    <Alert variant="destructive" className="max-w-md">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Nenhum quarto encontrado</AlertTitle>
                      <AlertDescription>
                        Nenhum quarto padrão corresponde aos filtros aplicados.
                      </AlertDescription>
                    </Alert>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="mt-2"
                    >
                      <XCircleIcon className="mr-2 h-4 w-4" />
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="deluxe" className="space-y-4">
                {filteredRooms.filter((room) => room.type === "Deluxe").length >
                0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms
                      .filter((room) => room.type === "Deluxe")
                      .map((room) => (
                        <RoomCard
                          key={room.number}
                          room={room}
                          onDelete={handleDeleteRoom}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="p-4 flex flex-col items-center justify-center gap-2">
                    <Alert variant="destructive" className="max-w-md">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Nenhum quarto encontrado</AlertTitle>
                      <AlertDescription>
                        Nenhum quarto luxo corresponde aos filtros aplicados.
                      </AlertDescription>
                    </Alert>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="mt-2"
                    >
                      <XCircleIcon className="mr-2 h-4 w-4" />
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="suite" className="space-y-4">
                {filteredRooms.filter((room) => room.type === "Suite").length >
                0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredRooms
                      .filter((room) => room.type === "Suite")
                      .map((room) => (
                        <RoomCard
                          key={room.number}
                          room={room}
                          onDelete={handleDeleteRoom}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="p-4 flex flex-col items-center justify-center gap-2">
                    <Alert variant="destructive" className="max-w-md">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Nenhum quarto encontrado</AlertTitle>
                      <AlertDescription>
                        Nenhuma suíte corresponde aos filtros aplicados.
                      </AlertDescription>
                    </Alert>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="mt-2"
                    >
                      <XCircleIcon className="mr-2 h-4 w-4" />
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RoomCard({
  room,
  onDelete,
}: {
  room: Room;
  onDelete?: (roomNumber: string) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(room.number);
    }
  };

  const handleBookRoom = () => {
    // Navegar para a página de reservas com os parâmetros para abrir o diálogo e pré-selecionar o quarto
    router.push(`/bookings?action=new&room=${room.number}&type=${room.type}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative bg-muted">
        <img
          src={room.image || "/placeholder.svg?height=200&width=300"}
          alt={`Room ${room.number}`}
          className="object-cover w-full h-full"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            room.status === "Available"
              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300"
              : room.status === "Occupied"
              ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
              : "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300"
          }`}
        >
          {room.status === "Available"
            ? "Disponível"
            : room.status === "Occupied"
            ? "Ocupado"
            : "Manutenção"}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Quarto {room.number}</CardTitle>
          <Badge variant="outline">
            {room.type === "Standard"
              ? "Padrão"
              : room.type === "Deluxe"
              ? "Luxo"
              : "Suíte"}
          </Badge>
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">R$ {room.rate}</span> / noite
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookRoom}
              disabled={room.status !== "Available"}
              title={
                room.status !== "Available"
                  ? "Somente quartos disponíveis podem ser reservados"
                  : "Reservar este quarto"
              }
            >
              <CalendarPlusIcon className="h-4 w-4 mr-1" />
              Reservar
            </Button>
            <Button size="sm" onClick={() => setShowDetails(true)}>
              Ver Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
      <RoomDetailsDialog
        room={room}
        open={showDetails}
        onOpenChange={setShowDetails}
        onBookRoom={handleBookRoom}
      />
    </Card>
  );
}

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
    rate: 99,
    description: "Cama queen, vista para a cidade, 25m²",
  },
  {
    number: "102",
    type: "Standard",
    status: "Occupied",
    rate: 99,
    description: "Cama queen, vista para o jardim, 25m²",
  },
  {
    number: "201",
    type: "Deluxe",
    status: "Occupied",
    rate: 149,
    description: "Cama king, vista para a cidade, 35m²",
  },
  {
    number: "202",
    type: "Deluxe",
    status: "Maintenance",
    rate: 149,
    description: "Cama king, vista para o oceano, 35m²",
  },
  {
    number: "301",
    type: "Suite",
    status: "Available",
    rate: 249,
    description: "Cama king, sala de estar, 50m²",
  },
  {
    number: "302",
    type: "Suite",
    status: "Occupied",
    rate: 249,
    description: "Cama king, varanda, 50m²",
  },
];
