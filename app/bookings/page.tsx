"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  PencilIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { NewBookingDialog } from "./new-booking-dialog";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(bookingData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredBookings, setFilteredBookings] =
    useState<Booking[]>(bookingData);
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<{
    number: string;
    type: string;
  } | null>(null);

  const searchParams = useSearchParams();

  // Verificar se há parâmetros na URL para abrir diálogo de nova reserva
  useEffect(() => {
    const action = searchParams.get("action");
    const room = searchParams.get("room");
    const type = searchParams.get("type");

    if (action === "new" && room) {
      setSelectedRoom({
        number: room,
        type: type || "",
      });
      setShowNewBookingDialog(true);
    }
  }, [searchParams]);

  // Função para limpar os filtros
  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  // Filtrar as reservas de acordo com os critérios
  useEffect(() => {
    let result = [...bookings];

    // Aplicar filtro de pesquisa
    if (searchTerm) {
      result = result.filter(
        (booking) =>
          booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.roomType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de status
    if (statusFilter !== "all") {
      result = result.filter((booking) => {
        if (statusFilter === "confirmed") return booking.status === "Confirmed";
        if (statusFilter === "checked-in")
          return booking.status === "Checked In";
        if (statusFilter === "checked-out")
          return booking.status === "Checked Out";
        if (statusFilter === "pending") return booking.status === "Pending";
        if (statusFilter === "cancelled") return booking.status === "Cancelled";
        return true;
      });
    }

    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter]);

  // Função para cancelar uma reserva
  const handleCancelBooking = (bookingId: string) => {
    // Verificar se a reserva está com check-in feito
    const booking = bookings.find((b) => b.id === bookingId);

    if (booking?.status === "Checked In") {
      toast({
        title: "Não foi possível cancelar",
        description:
          "Não é possível cancelar uma reserva com check-in já realizado.",
        variant: "destructive",
      });
      return;
    }

    // Se passou na verificação, cancelar a reserva
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "Cancelled" } : b
      )
    );

    toast({
      title: "Reserva cancelada",
      description: `A reserva foi cancelada com sucesso.`,
    });
  };

  // Função para adicionar uma nova reserva
  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    toast({
      title: "Reserva adicionada",
      description: `Reserva para ${newBooking.guestName} foi adicionada com sucesso.`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Gestão de Reservas
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm" onClick={() => setShowNewBookingDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Nova Reserva
          </Button>
        </div>
      </div>

      {/* Diálogo de nova reserva */}
      <NewBookingDialog
        open={showNewBookingDialog}
        onOpenChange={setShowNewBookingDialog}
        onAddBooking={handleAddBooking}
        initialRoom={selectedRoom}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reservas Ativas
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                bookings.filter(
                  (b) => b.status === "Confirmed" || b.status === "Checked In"
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Check-ins Hoje
            </CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Chegadas programadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Check-outs Hoje
            </CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Partidas programadas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmações Pendentes
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bookings.filter((b) => b.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Aguardando confirmação
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gerenciar Reservas</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as reservas do hotel
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar reservas..."
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
                  <SelectItem value="confirmed">Confirmada</SelectItem>
                  <SelectItem value="checked-in">Check-in Realizado</SelectItem>
                  <SelectItem value="checked-out">
                    Check-out Realizado
                  </SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Próximas</TabsTrigger>
              <TabsTrigger value="current">Estadias Atuais</TabsTrigger>
              <TabsTrigger value="past">Reservas Anteriores</TabsTrigger>
              <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-4">
              {filteredBookings.filter(
                (booking) =>
                  booking.status === "Confirmed" || booking.status === "Pending"
              ).length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID da Reserva</TableHead>
                      <TableHead>Hóspede</TableHead>
                      <TableHead>Quarto</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings
                      .filter(
                        (booking) =>
                          booking.status === "Confirmed" ||
                          booking.status === "Pending"
                      )
                      .map((booking) => (
                        <BookingRow
                          key={booking.id}
                          booking={booking}
                          onCancel={() => handleCancelBooking(booking.id)}
                        />
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Nenhuma reserva encontrada</AlertTitle>
                    <AlertDescription>
                      Nenhuma reserva próxima corresponde aos filtros aplicados.
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
            <TabsContent value="current" className="space-y-4">
              {filteredBookings.filter(
                (booking) => booking.status === "Checked In"
              ).length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID da Reserva</TableHead>
                      <TableHead>Hóspede</TableHead>
                      <TableHead>Quarto</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings
                      .filter((booking) => booking.status === "Checked In")
                      .map((booking) => (
                        <BookingRow
                          key={booking.id}
                          booking={booking}
                          onCancel={() => handleCancelBooking(booking.id)}
                        />
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Nenhuma reserva encontrada</AlertTitle>
                    <AlertDescription>
                      Nenhuma estadia atual corresponde aos filtros aplicados.
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
            <TabsContent value="past" className="space-y-4">
              {filteredBookings.filter(
                (booking) => booking.status === "Checked Out"
              ).length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID da Reserva</TableHead>
                      <TableHead>Hóspede</TableHead>
                      <TableHead>Quarto</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings
                      .filter((booking) => booking.status === "Checked Out")
                      .map((booking) => (
                        <BookingRow
                          key={booking.id}
                          booking={booking}
                          onCancel={() => handleCancelBooking(booking.id)}
                        />
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Nenhuma reserva encontrada</AlertTitle>
                    <AlertDescription>
                      Nenhuma reserva anterior corresponde aos filtros
                      aplicados.
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
            <TabsContent value="cancelled" className="space-y-4">
              {filteredBookings.filter(
                (booking) => booking.status === "Cancelled"
              ).length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID da Reserva</TableHead>
                      <TableHead>Hóspede</TableHead>
                      <TableHead>Quarto</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor Total</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings
                      .filter((booking) => booking.status === "Cancelled")
                      .map((booking) => (
                        <BookingRow
                          key={booking.id}
                          booking={booking}
                          onCancel={() => handleCancelBooking(booking.id)}
                        />
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 flex flex-col items-center justify-center gap-2">
                  <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Nenhuma reserva encontrada</AlertTitle>
                    <AlertDescription>
                      Nenhuma reserva cancelada corresponde aos filtros
                      aplicados.
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
  );
}

function BookingRow({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel?: () => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-mono text-xs">{booking.id}</div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={booking.guestAvatar} alt={booking.guestName} />
            <AvatarFallback>{booking.guestInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{booking.guestName}</div>
            <div className="text-xs text-muted-foreground">
              {booking.guestEmail}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{booking.room}</div>
        <div className="text-xs text-muted-foreground">{booking.roomType}</div>
      </TableCell>
      <TableCell>{booking.checkIn}</TableCell>
      <TableCell>{booking.checkOut}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            booking.status === "Confirmed"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
              : booking.status === "Checked In"
              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
              : booking.status === "Checked Out"
              ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800"
              : booking.status === "Pending"
              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
          }
        >
          {booking.status === "Confirmed"
            ? "Confirmada"
            : booking.status === "Checked In"
            ? "Check-in Realizado"
            : booking.status === "Checked Out"
            ? "Check-out Realizado"
            : booking.status === "Pending"
            ? "Pendente"
            : "Cancelada"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="font-medium">R$ 450,00</div>
        <div className="text-xs text-muted-foreground">
          {booking.paymentStatus} • {booking.paymentMethod}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <EyeIcon className="h-4 w-4" />
            <span className="sr-only">Ver</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={
              booking.status === "Checked In" || booking.status === "Cancelled"
            }
            title={
              booking.status === "Checked In"
                ? "Não é possível cancelar uma reserva com check-in já realizado"
                : ""
            }
            onClick={onCancel}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Cancelar</span>
          </Button>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <PencilIcon className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestAvatar?: string;
  guestInitials: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Checked In" | "Checked Out" | "Pending" | "Cancelled";
  paymentStatus: string;
  paymentMethod: string;
}

const bookingData: Booking[] = [
  {
    id: "b1",
    guestName: "João Silva",
    guestEmail: "joao.s@exemplo.com",
    guestInitials: "JS",
    room: "101",
    roomType: "Luxo",
    checkIn: "14/03/2024",
    checkOut: "17/03/2024",
    status: "Confirmed",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "b2",
    guestName: "Maria Santos",
    guestEmail: "maria.s@exemplo.com",
    guestInitials: "MS",
    room: "203",
    roomType: "Suíte",
    checkIn: "12/03/2024",
    checkOut: "15/03/2024",
    status: "Checked In",
    paymentStatus: "Pago",
    paymentMethod: "Pix",
  },
  {
    id: "b3",
    guestName: "Pedro Oliveira",
    guestEmail: "pedro.o@exemplo.com",
    guestInitials: "PO",
    room: "105",
    roomType: "Standard",
    checkIn: "20/03/2024",
    checkOut: "22/03/2024",
    status: "Pending",
    paymentStatus: "Pendente",
    paymentMethod: "Pix",
  },
  {
    id: "b4",
    guestName: "Ana Costa",
    guestEmail: "ana.c@exemplo.com",
    guestInitials: "AC",
    room: "302",
    roomType: "Suíte",
    checkIn: "05/03/2024",
    checkOut: "10/03/2024",
    status: "Checked Out",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "b5",
    guestName: "Carlos Lima",
    guestEmail: "carlos.l@exemplo.com",
    guestInitials: "CL",
    room: "204",
    roomType: "Luxo",
    checkIn: "15/03/2024",
    checkOut: "18/03/2024",
    status: "Cancelled",
    paymentStatus: "Reembolsado",
    paymentMethod: "Cartão de Crédito",
  },
];
