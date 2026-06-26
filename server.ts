import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve simulated Order checkout
app.post("/api/checkout", (req, res) => {
  const { customer, items, total } = req.body;
  
  if (!customer?.name || !customer?.phone || !items || items.length === 0) {
    return res.status(400).json({ error: "Dados incompletos para envio do pedido." });
  }

  const orderId = "DC-" + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    success: true,
    orderId,
    message: "Pedido recebido com amor na Fazenda Doce Colheita! Nós vamos preparar tudo com carinho e entrar em contato.",
    orderSummary: {
      orderId,
      customerName: customer.name,
      total,
      itemCount: items.length
    }
  });
});

// Vite Middleware Configuration for development vs production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Doce Colheita] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
