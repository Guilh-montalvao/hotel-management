import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCardIcon,
  DollarSignIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  WalletIcon,
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

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          Pagamentos e Faturas
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nova Fatura
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
              Pagamentos Pendentes
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 5.946,00</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
              -4,3% em relação à semana anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transações</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.248</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Média de Transações
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 189,43</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpIcon className="mr-1 h-4 w-4 text-emerald-500" />
              +2,5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transações de Pagamento</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as transações de pagamento
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-[250px]">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar transações..."
                  className="pl-8"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Transações</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="failed">Falhas</SelectItem>
                  <SelectItem value="refunded">Reembolsadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todas as Transações</TabsTrigger>
              <TabsTrigger value="recent">Recentes</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="refunds">Reembolsos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionData.map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="recent" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionData.slice(0, 3).map((transaction) => (
                    <TransactionRow
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionData
                    .filter((t) => t.status === "Pending")
                    .map((transaction) => (
                      <TransactionRow
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="refunds" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionData
                    .filter((t) => t.status === "Refunded")
                    .map((transaction) => (
                      <TransactionRow
                        key={transaction.id}
                        transaction={transaction}
                      />
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

function TransactionRow({ transaction }: { transaction: Transaction }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{transaction.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={transaction.guestAvatar}
              alt={transaction.guestName}
            />
            <AvatarFallback>{transaction.guestInitials}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{transaction.guestName}</div>
        </div>
      </TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell className="font-medium">
        ${transaction.amount.toFixed(2)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          {transaction.method}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            transaction.status === "Completed"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
              : transaction.status === "Pending"
              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
              : transaction.status === "Failed"
              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800"
              : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-800"
          }
        >
          {transaction.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Visualizar
          </Button>
          <Button size="sm">Recibo</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface Transaction {
  id: string;
  guestName: string;
  guestInitials: string;
  guestAvatar?: string;
  date: string;
  amount: number;
  method: string;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
}

const transactionData: Transaction[] = [
  {
    id: "TRX-4829",
    guestName: "João Silva",
    guestInitials: "JS",
    date: "12/03/2024",
    amount: 450.0,
    method: "Cartão de Crédito",
    status: "Concluída",
  },
  {
    id: "TRX-4830",
    guestName: "Maria Santos",
    guestInitials: "MS",
    date: "13/03/2024",
    amount: 325.5,
    method: "PayPal",
    status: "Pendente",
  },
  {
    id: "TRX-4831",
    guestName: "Pedro Oliveira",
    guestInitials: "PO",
    date: "10/03/2024",
    amount: 780.25,
    method: "Cartão de Crédito",
    status: "Concluída",
  },
  {
    id: "TRX-4832",
    guestName: "Ana Costa",
    guestInitials: "AC",
    date: "08/03/2024",
    amount: 195.0,
    method: "MPesa",
    status: "Concluída",
  },
  {
    id: "TRX-4833",
    guestName: "Carlos Lima",
    guestInitials: "CL",
    date: "05/03/2024",
    amount: 550.75,
    method: "Cartão de Crédito",
    status: "Reembolsada",
  },
  {
    id: "TRX-4834",
    guestName: "Beatriz Souza",
    guestInitials: "BS",
    date: "03/03/2024",
    amount: 225.0,
    method: "Cartão de Crédito",
    status: "Falha",
  },
];
