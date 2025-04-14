import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BedDoubleIcon,
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  PercentIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OccupancyChart } from "@/components/dashboard/occupancy-chart";
import { RevenueChart } from "@/components/dashboard/revenue-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Painel de Controle
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Filtrar por Data
          </Button>
          <Button size="sm">
            <ArrowDownIcon className="mr-2 h-4 w-4" />
            Baixar Relatório
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-emerald-500" />
              +20,1% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Ocupação
            </CardTitle>
            <PercentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84,3%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-emerald-500" />
              +4,3% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quartos Disponíveis
            </CardTitle>
            <BedDoubleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              De 120 quartos no total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novas Reservas
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              -8% em relação a ontem
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Taxa de Ocupação</CardTitle>
                <CardDescription>
                  Ocupação dos quartos nos últimos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OccupancyChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Receita</CardTitle>
                <CardDescription>
                  Distribuição mensal da receita
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Reservas Recentes</CardTitle>
                <CardDescription>
                  Você tem 6 novas reservas hoje
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={booking.avatar} />
                          <AvatarFallback>{booking.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {booking.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quarto {booking.room}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground whitespace-nowrap">
                          {booking.date}
                        </p>
                        <Badge
                          variant={
                            booking.status === "Confirmada"
                              ? "default"
                              : booking.status === "Pendente"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>Tarefas e operações comuns</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Nova Reserva
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UsersIcon className="mr-2 h-4 w-4" />
                  Adicionar Hóspede
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BedDoubleIcon className="mr-2 h-4 w-4" />
                  Status dos Quartos
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  Processar Pagamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo de Análises</CardTitle>
              <CardDescription>
                Análises detalhadas serão exibidas aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Gráficos e dados de análise serão exibidos aqui
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo de Relatórios</CardTitle>
              <CardDescription>
                Relatórios gerados serão exibidos aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Dados e exportações de relatórios serão exibidos aqui
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const recentBookings = [
  {
    id: "1",
    name: "Emma Thompson",
    room: "301",
    date: "Check-in: Hoje",
    status: "Confirmada",
    avatar: "/placeholder.svg",
    initials: "ET",
  },
  {
    id: "2",
    name: "Michael Chen",
    room: "205",
    date: "Check-in: Amanhã",
    status: "Pendente",
    avatar: "/placeholder.svg",
    initials: "MC",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    room: "412",
    date: "Check-in: Hoje",
    status: "Confirmada",
    avatar: "/placeholder.svg",
    initials: "SJ",
  },
  {
    id: "4",
    name: "David Williams",
    room: "118",
    date: "Check-out: Hoje",
    status: "Hóspede Presente",
    avatar: "/placeholder.svg",
    initials: "DW",
  },
  {
    id: "5",
    name: "Olivia Martinez",
    room: "507",
    date: "Check-in: 15/03",
    status: "Confirmada",
    avatar: "/placeholder.svg",
    initials: "OM",
  },
  {
    id: "6",
    name: "James Wilson",
    room: "220",
    date: "Check-in: 16/03",
    status: "Pendente",
    avatar: "/placeholder.svg",
    initials: "JW",
  },
];
