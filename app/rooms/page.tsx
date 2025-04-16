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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { AddRoomDialog } from "./add-room-dialog";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(roomData);

  const handleAddRoom = (newRoom: Room) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
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
            <div className="text-2xl font-bold">120</div>
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
            <div className="text-2xl font-bold">24</div>
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
            <div className="text-2xl font-bold">86</div>
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
            <div className="text-2xl font-bold">10</div>
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
                  />
                </div>
                <Select defaultValue="all">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.map((room) => (
                    <RoomCard key={room.number} room={room} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="standard" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms
                    .filter((room) => room.type === "Standard")
                    .map((room) => (
                      <RoomCard key={room.number} room={room} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="deluxe" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms
                    .filter((room) => room.type === "Deluxe")
                    .map((room) => (
                      <RoomCard key={room.number} room={room} />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="suite" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms
                    .filter((room) => room.type === "Suite")
                    .map((room) => (
                      <RoomCard key={room.number} room={room} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RoomCard({ room }: { room: Room }) {
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
          {room.status}
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
            <Button variant="outline" size="sm">
              <WrenchIcon className="h-4 w-4 mr-1" />
              Gerenciar
            </Button>
            <Button size="sm">Ver Detalhes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface Room {
  number: string;
  type: "Standard" | "Deluxe" | "Suite";
  status: "Available" | "Occupied" | "Maintenance";
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
    type: "Suíte",
    status: "Available",
    rate: 249,
    description: "Cama king, sala de estar, 50m²",
  },
  {
    number: "302",
    type: "Suíte",
    status: "Occupied",
    rate: 249,
    description: "Cama king, varanda, 50m²",
  },
];
