import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FilterIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  UsersIcon,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GuestsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Gestão de Hóspedes
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            Adicionar Hóspede
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Hóspedes
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.248</div>
            <p className="text-xs text-muted-foreground">
              Todos os hóspedes registrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hóspedes Atuais
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">
              Hospedados no momento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hóspedes Recentes
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Registros
            </CardTitle>
            <PlusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Diretório de Hóspedes</CardTitle>
              <CardDescription>
                Visualize e gerencie perfis de hóspedes
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar hóspedes..."
                  className="pl-8"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Hóspedes</SelectItem>
                  <SelectItem value="atual">Hóspedes Atuais</SelectItem>
                  <SelectItem value="anterior">Hóspedes Anteriores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos os Hóspedes</TabsTrigger>
              <TabsTrigger value="current">Atuais</TabsTrigger>
              <TabsTrigger value="recent">Recentes</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hóspede</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Estadia</TableHead>
                    <TableHead>Total de Estadias</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guestData.map((guest) => (
                    <GuestRow key={guest.id} guest={guest} />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="current" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hóspede</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Estadia</TableHead>
                    <TableHead>Total de Estadias</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guestData
                    .filter((guest) => guest.status === "Atual")
                    .map((guest) => (
                      <GuestRow key={guest.id} guest={guest} />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hóspede</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Última Estadia</TableHead>
                    <TableHead>Total de Estadias</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guestData
                    .filter((guest) => guest.status === "Recente")
                    .map((guest) => (
                      <GuestRow key={guest.id} guest={guest} />
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

function GuestRow({ guest }: { guest: Guest }) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={guest.avatar} alt={guest.name} />
            <AvatarFallback>{guest.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center gap-1">
              {guest.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {guest.nationality}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{guest.email}</div>
        <div className="text-xs text-muted-foreground">{guest.phone}</div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            guest.status === "Atual"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
              : guest.status === "Recente"
              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
              : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800"
          }
        >
          {guest.status}
        </Badge>
      </TableCell>
      <TableCell>{guest.lastStay}</TableCell>
      <TableCell>{guest.totalStays}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {guest.preferences.map((pref, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {pref}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Perfil
          </Button>
          <Button size="sm">Contato</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface Guest {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  email: string;
  phone: string;
  nationality: string;
  status: "Atual" | "Recente" | "Anterior";
  lastStay: string;
  totalStays: number;
  preferences: string[];
}

const guestData: Guest[] = [
  {
    id: "1",
    name: "João Silva",
    initials: "JS",
    email: "joao.s@exemplo.com",
    phone: "+55 (11) 1234-5678",
    nationality: "Brasil",
    status: "Atual",
    lastStay: "12/03/2024",
    totalStays: 5,
    preferences: ["Andar Alto", "Não Fumante", "Check-in Antecipado"],
  },
  {
    id: "2",
    name: "Maria Santos",
    initials: "MS",
    email: "maria.s@exemplo.com",
    phone: "+55 (11) 9876-5432",
    nationality: "Brasil",
    status: "Atual",
    lastStay: "13/03/2024",
    totalStays: 2,
    preferences: ["Cama King", "Quarto Silencioso"],
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    initials: "PO",
    email: "pedro.o@exemplo.com",
    phone: "+55 (11) 4567-8901",
    nationality: "Brasil",
    status: "Atual",
    lastStay: "10/03/2024",
    totalStays: 8,
    preferences: [
      "Vista para o Mar",
      "Travesseiros Extras",
      "Check-out Tardio",
    ],
  },
  {
    id: "4",
    name: "Ana Costa",
    initials: "AC",
    email: "ana.c@exemplo.com",
    phone: "+55 (11) 7890-1234",
    nationality: "Brasil",
    status: "Recente",
    lastStay: "05/03/2024",
    totalStays: 3,
    preferences: ["Vista para a Cidade", "Toalhas Extras"],
  },
  {
    id: "5",
    name: "Carlos Lima",
    initials: "CL",
    email: "carlos.l@exemplo.com",
    phone: "+55 (11) 2345-6789",
    nationality: "Brasil",
    status: "Anterior",
    lastStay: "20/02/2024",
    totalStays: 1,
    preferences: ["Camas de Solteiro"],
  },
  {
    id: "6",
    name: "Beatriz Souza",
    initials: "BS",
    email: "beatriz.s@exemplo.com",
    phone: "+55 (11) 3456-7890",
    nationality: "Brasil",
    status: "Recente",
    lastStay: "01/03/2024",
    totalStays: 4,
    preferences: ["Suíte", "Champanhe de Boas-vindas", "Transfer do Aeroporto"],
  },
];
