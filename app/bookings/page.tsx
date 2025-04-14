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

export default function BookingsPage() {
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
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nova Reserva
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reservas Ativas
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
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
            <div className="text-2xl font-bold">5</div>
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
                />
              </div>
              <Select defaultValue="all">
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
                  {bookingData
                    .filter(
                      (booking) =>
                        booking.status === "Confirmed" ||
                        booking.status === "Pending"
                    )
                    .map((booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="current" className="space-y-4">
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
                  {bookingData
                    .filter((booking) => booking.status === "Checked In")
                    .map((booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="past" className="space-y-4">
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
                  {bookingData
                    .filter((booking) => booking.status === "Checked Out")
                    .map((booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="cancelled" className="space-y-4">
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
                  {bookingData
                    .filter((booking) => booking.status === "Cancelled")
                    .map((booking) => (
                      <BookingRow key={booking.id} booking={booking} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  return (
    <TableRow>
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
        <div className="font-medium">Quarto {booking.room}</div>
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
              ? "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800"
              : booking.status === "Pending"
              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
          }
        >
          {booking.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="font-medium">{booking.paymentStatus}</div>
        <div className="text-xs text-muted-foreground">
          {booking.paymentMethod}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button size="sm">Editar</Button>
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
    id: "1",
    guestName: "João Silva",
    guestEmail: "joao.s@exemplo.com",
    guestInitials: "JS",
    room: "301",
    roomType: "Suíte",
    checkIn: "12/03/2024",
    checkOut: "15/03/2024",
    status: "Confirmada",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "2",
    guestName: "Maria Santos",
    guestEmail: "maria.s@exemplo.com",
    guestInitials: "MS",
    room: "205",
    roomType: "Luxo",
    checkIn: "13/03/2024",
    checkOut: "16/03/2024",
    status: "Pendente",
    paymentStatus: "Pendente",
    paymentMethod: "PayPal",
  },
  {
    id: "3",
    guestName: "Pedro Oliveira",
    guestEmail: "pedro.o@exemplo.com",
    guestInitials: "PO",
    room: "412",
    roomType: "Suíte",
    checkIn: "10/03/2024",
    checkOut: "14/03/2024",
    status: "Check-in Realizado",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "4",
    guestName: "Ana Costa",
    guestEmail: "ana.c@exemplo.com",
    guestInitials: "AC",
    room: "118",
    roomType: "Padrão",
    checkIn: "08/03/2024",
    checkOut: "12/03/2024",
    status: "Check-out Realizado",
    paymentStatus: "Pago",
    paymentMethod: "MPesa",
  },
  {
    id: "5",
    guestName: "Carlos Lima",
    guestEmail: "carlos.l@exemplo.com",
    guestInitials: "CL",
    room: "507",
    roomType: "Luxo",
    checkIn: "15/03/2024",
    checkOut: "18/03/2024",
    status: "Confirmada",
    paymentStatus: "Pago",
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "6",
    guestName: "Beatriz Souza",
    guestEmail: "beatriz.s@exemplo.com",
    guestInitials: "BS",
    room: "220",
    roomType: "Padrão",
    checkIn: "05/03/2024",
    checkOut: "07/03/2024",
    status: "Cancelada",
    paymentStatus: "Reembolsado",
    paymentMethod: "Cartão de Crédito",
  },
];
