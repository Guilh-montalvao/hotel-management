import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BedDoubleIcon,
  CalendarIcon,
  CalendarPlusIcon,
  MapPinIcon,
  RulerIcon,
  Users2Icon,
  WifiIcon,
  TvIcon,
  ShowerHeadIcon,
  DoorOpenIcon,
  ClockIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface RoomDetailsDialogProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookRoom: () => void;
}

interface Room {
  number: string;
  type: "Standard" | "Deluxe" | "Suite";
  status: "Available" | "Occupied" | "Maintenance" | "Cleaning";
  rate: number;
  description: string;
  image?: string;
}

// Exemplo de histórico de reservas
const bookingHistory = [
  {
    id: "b1001",
    guestName: "Sofia Oliveira",
    guestInitials: "SO",
    checkIn: "01/02/2024",
    checkOut: "05/02/2024",
    status: "Concluída",
    totalValue: "R$ 495,00",
  },
  {
    id: "b895",
    guestName: "Lucas Mendes",
    guestInitials: "LM",
    checkIn: "15/01/2024",
    checkOut: "18/01/2024",
    status: "Concluída",
    totalValue: "R$ 297,00",
  },
  {
    id: "b742",
    guestName: "Amanda Castro",
    guestInitials: "AC",
    checkIn: "22/12/2023",
    checkOut: "26/12/2023",
    status: "Concluída",
    totalValue: "R$ 396,00",
  },
];

// Amenidades disponíveis por tipo de quarto
const amenities = {
  Standard: ["Wi-Fi gratuito", "TV", "Banheiro privativo", "Ar-condicionado"],
  Deluxe: [
    "Wi-Fi gratuito",
    'TV LED 42"',
    "Banheiro privativo com banheira",
    "Ar-condicionado",
    "Frigobar",
    "Mesa de trabalho",
  ],
  Suite: [
    "Wi-Fi gratuito",
    'Smart TV 50"',
    "Banheiro privativo com hidromassagem",
    "Ar-condicionado",
    "Frigobar",
    "Sala de estar separada",
    "Área de trabalho",
    "Cofre digital",
    "Roupão e chinelos",
  ],
};

// Tamanhos aproximados dos quartos por tipo
const roomSizes = {
  Standard: "25m²",
  Deluxe: "35m²",
  Suite: "50m²",
};

export function RoomDetailsDialog({
  room,
  open,
  onOpenChange,
  onBookRoom,
}: RoomDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Detalhes do Quarto {room.number}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Imagem e detalhes principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-video relative bg-muted rounded-md overflow-hidden">
              <img
                src={room.image || "/placeholder.svg?height=300&width=500"}
                alt={`Quarto ${room.number}`}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Quarto {room.number}</h2>
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

              <div>
                <Badge variant="secondary" className="mb-2">
                  {room.type === "Standard"
                    ? "Padrão"
                    : room.type === "Deluxe"
                    ? "Luxo"
                    : "Suíte"}
                </Badge>
                <p className="text-muted-foreground">{room.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <RulerIcon className="h-4 w-4 text-muted-foreground" />
                <span>{roomSizes[room.type]}</span>
              </div>

              <div className="font-medium text-lg">
                <span>R$ {room.rate}</span>
                <span className="text-sm text-muted-foreground"> / noite</span>
              </div>

              <Button
                onClick={onBookRoom}
                disabled={room.status !== "Available"}
                className="w-full"
              >
                <CalendarPlusIcon className="h-4 w-4 mr-2" />
                Reservar este quarto
              </Button>
            </div>
          </div>

          <Separator />

          {/* Amenidades */}
          <div>
            <h3 className="font-medium mb-3">Amenidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenities[room.type].map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  {amenity.includes("Wi-Fi") ? (
                    <WifiIcon className="h-4 w-4 text-muted-foreground" />
                  ) : amenity.includes("TV") ? (
                    <TvIcon className="h-4 w-4 text-muted-foreground" />
                  ) : amenity.includes("Banheiro") ? (
                    <ShowerHeadIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <DoorOpenIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Abas com histórico de reservas */}
          <Tabs defaultValue="history">
            <TabsList>
              <TabsTrigger value="history">Histórico de Reservas</TabsTrigger>
              <TabsTrigger value="maintenance">Manutenções</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-4">
              <h3 className="font-medium mb-3">Histórico de Reservas</h3>
              {bookingHistory.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Hóspede</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingHistory.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-xs">
                          {booking.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>
                                {booking.guestInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{booking.guestName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.status}</Badge>
                        </TableCell>
                        <TableCell>{booking.totalValue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Nenhuma reserva encontrada para este quarto.
                </p>
              )}
            </TabsContent>
            <TabsContent value="maintenance" className="mt-4">
              <h3 className="font-medium mb-3">Histórico de Manutenções</h3>
              <p className="text-muted-foreground text-sm">
                Nenhum registro de manutenção encontrado para este quarto.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
