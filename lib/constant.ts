export const tableData = [
    { address: "1aEF20", amount: "4,291.2192", balance: "4,291.2192" },
    { address: "1aEF20", amount: "1,700.2192", balance: "1,700.2192" },
    { address: "1aEF20", amount: "897.742", balance: "897.742" },
    { address: "1aEF20", amount: "502.116", balance: "502.116" },
    { address: "1aEF20", amount: "328.01", balance: "328.01" },
    { address: "1aEF20", amount: "250.45", balance: "250.45" },
    { address: "1aEF20", amount: "198.72", balance: "198.72" },
    { address: "1aEF20", amount: "175.33", balance: "175.33" },
    { address: "1aEF20", amount: "150.89", balance: "150.89" },
    { address: "1aEF20", amount: "125.67", balance: "125.67" },
    { address: "1aEF20", amount: "100.45", balance: "100.45" },
    { address: "1aEF20", amount: "95.23", balance: "95.23" },
    { address: "1aEF20", amount: "85.11", balance: "85.11" },
    { address: "1aEF20", amount: "75.92", balance: "75.92" },
  ]
  

export const tableSmart = [
    { address: "1aEF20", amount: "4,291.2192", balance: "400k" },
    { address: "1aEF20", amount: "1,700.2192", balance: "230k" },
    { address: "1aEF20", amount: "897.742", balance: "120k" },
    { address: "1aEF20", amount: "897.742", balance: "120k" },
    { address: "1aEF20", amount: "897.742", balance: "120k" },
  ];



  interface Transaction {
    address: string
    type: "Buy" | "Sell"
    priceUSD: number
    amountSNTI: number
    totalGEN: number
    timeAgo: string
  }
  
 export const transactions: Transaction[] = [
    { address: "1aEF20", type: "Buy", priceUSD: 4291.2192, amountSNTI: 4291.2192, totalGEN: 4291.2192, timeAgo: "30s" },
    { address: "1aEF20", type: "Buy", priceUSD: 1700.2192, amountSNTI: 1700.2192, totalGEN: 1700.2192, timeAgo: "42s" },
    { address: "1aEF20", type: "Buy", priceUSD: 897.742, amountSNTI: 897.742, totalGEN: 897.742, timeAgo: "2m" },
    { address: "1aEF20", type: "Sell", priceUSD: 502.116, amountSNTI: 502.116, totalGEN: 502.116, timeAgo: "5m" },
    { address: "1aEF20", type: "Buy", priceUSD: 328.01, amountSNTI: 328.01, totalGEN: 328.01, timeAgo: "6h" },
    { address: "1aEF20", type: "Buy", priceUSD: 4291.2192, amountSNTI: 4291.2192, totalGEN: 4291.2192, timeAgo: "30s" },
    { address: "1aEF20", type: "Buy", priceUSD: 1700.2192, amountSNTI: 1700.2192, totalGEN: 1700.2192, timeAgo: "42s" },
    { address: "1aEF20", type: "Buy", priceUSD: 897.742, amountSNTI: 897.742, totalGEN: 897.742, timeAgo: "2m" },
    { address: "1aEF20", type: "Sell", priceUSD: 502.116, amountSNTI: 502.116, totalGEN: 502.116, timeAgo: "5m" },
    { address: "1aEF20", type: "Buy", priceUSD: 4291.2192, amountSNTI: 4291.2192, totalGEN: 4291.2192, timeAgo: "30s" },
    { address: "1aEF20", type: "Buy", priceUSD: 1700.2192, amountSNTI: 1700.2192, totalGEN: 1700.2192, timeAgo: "42s" },
    { address: "1aEF20", type: "Buy", priceUSD: 897.742, amountSNTI: 897.742, totalGEN: 897.742, timeAgo: "2m" },
    { address: "1aEF20", type: "Sell", priceUSD: 502.116, amountSNTI: 502.116, totalGEN: 502.116, timeAgo: "5m" },

  ]
  


  
interface CryptoData {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  marketCap: string;
  marketCapChange: string;
  tvl: string;
  holders: string;
  volume24h: string;
  interferences: string;
}

export const cryptoData: CryptoData[] = [
  {
    id: "1",
    name: "Driscoll",
    ticker: "DRIS",
    logo: "/token1.png",
    marketCap: "$410m",
    marketCapChange: "+12.31%",
    tvl: "$80.3m",
    holders: "172,500",
    volume24h: "$23.5m",
    interferences: "4,621,378",
  },
  {
    id: "2",
    name: "Unspaced",
    ticker: "UNSP",
    logo: "/token1.png",
    marketCap: "$275m",
    marketCapChange: "+9.15%",
    tvl: "$55.1m",
    holders: "140,300",
    volume24h: "$15.8m",
    interferences: "3,689,452",
  },
  {
    id: "3",
    name: "Ignite Jam",
    ticker: "IGJM",
    logo: "/token2.png",
    marketCap: "$145m",
    marketCapChange: "+7.82%",
    tvl: "$32.6m",
    holders: "98,400",
    volume24h: "$9.7m",
    interferences: "2,312,890",
  },
  {
    id: "4",
    name: "Nexus Flow",
    ticker: "NXFL",
    logo: "/token3.png",
    marketCap: "$98m",
    marketCapChange: "+5.43%",
    tvl: "$21.5m",
    holders: "76,200",
    volume24h: "$6.3m",
    interferences: "1,845,723",
  },
  {
    id: "5",
    name: "Quantum Pulse",
    ticker: "QPLS",
    logo: "/token2.png",
    marketCap: "$62m",
    marketCapChange: "+3.76%",
    tvl: "$14.8m",
    holders: "54,100",
    volume24h: "$4.2m",
    interferences: "1,267,345",
  },
  {
    id: "4",
    name: "Nexus Flow",
    ticker: "NXFL",
    logo: "/token1.png",
    marketCap: "$98m",
    marketCapChange: "+5.43%",
    tvl: "$21.5m",
    holders: "76,200",
    volume24h: "$6.3m",
    interferences: "1,845,723",
  },
  {
    id: "5",
    name: "Quantum Pulse",
    ticker: "QPLS",
    logo: "/token3.png",
    marketCap: "$62m",
    marketCapChange: "+3.76%",
    tvl: "$14.8m",
    holders: "54,100",
    volume24h: "$4.2m",
    interferences: "1,267,345",
  },{
    id: "4",
    name: "Nexus Flow",
    ticker: "NXFL",
    logo: "/token1.png",
    marketCap: "$98m",
    marketCapChange: "+5.43%",
    tvl: "$21.5m",
    holders: "76,200",
    volume24h: "$6.3m",
    interferences: "1,845,723",
  },
  {
    id: "5",
    name: "Quantum Pulse",
    ticker: "QPLS",
    logo: "/token1.png",
    marketCap: "$62m",
    marketCapChange: "+3.76%",
    tvl: "$14.8m",
    holders: "54,100",
    volume24h: "$4.2m",
    interferences: "1,267,345",
  },{
    id: "4",
    name: "Nexus Flow",
    ticker: "NXFL",
    logo: "/placeholder.svg?height=32&width=32",
    marketCap: "$98m",
    marketCapChange: "+5.43%",
    tvl: "$21.5m",
    holders: "76,200",
    volume24h: "$6.3m",
    interferences: "1,845,723",
  },
  {
    id: "5",
    name: "Quantum Pulse",
    ticker: "QPLS",
    logo: "/placeholder.svg?height=32&width=32",
    marketCap: "$62m",
    marketCapChange: "+3.76%",
    tvl: "$14.8m",
    holders: "54,100",
    volume24h: "$4.2m",
    interferences: "1,267,345",
  },{
    id: "4",
    name: "Nexus Flow",
    ticker: "NXFL",
    logo: "/placeholder.svg?height=32&width=32",
    marketCap: "$98m",
    marketCapChange: "+5.43%",
    tvl: "$21.5m",
    holders: "76,200",
    volume24h: "$6.3m",
    interferences: "1,845,723",
  },
  {
    id: "5",
    name: "Quantum Pulse",
    ticker: "QPLS",
    logo: "/placeholder.svg?height=32&width=32",
    marketCap: "$62m",
    marketCapChange: "+3.76%",
    tvl: "$14.8m",
    holders: "54,100",
    volume24h: "$4.2m",
    interferences: "1,267,345",
  },
];