import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely from server-side environment
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ GEMINI_API_KEY environment variable is not defined. Calls will fail.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Endpoint to design a personalized jam using the AI Chef
app.post("/api/chef-sommelier", async (req, res) => {
  try {
    const { baseFruit, seasonalFruit, sweetener, spices = [], intensity, textNote } = req.body;

    // Call Gemini with structured JSON output instructions
    const ai = getGeminiClient();
    
    const prompt = `Você é o Chefe e Sommelier de Geleias da Fazenda "Doce Colheita". 
Um cliente quer criar uma geleia artesanal sazonal personalizada e selecionou os seguintes ingredientes:
- Fruta de Base: ${baseFruit || "Nenhuma"}
- Fruta Sazonal Adicional: ${seasonalFruit || "Nenhuma"}
- Adoçante: ${sweetener || "Açúcar clássico orgânico"}
- Especiarias e Toques Secretos: ${spices.length > 0 ? spices.join(", ") : "Nenhuma"}
- Perfil de Intensidade: ${intensity || "Equilibrado"}
- Mensagem ou Pedido Especial do Cliente: "${textNote || ""}"

Crie uma resposta poética, refinada e gastronômica, condizente com uma marca artesanal de alto padrão de fazenda orgânica. Avalie a combinação de sabores de forma calorosa e técnica, dê um nome poético ao produto e sugira harmonizações perfeitas.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é o mestre geleieiro e sommelier da Doce Colheita Geleias Artesanais LTDA. Seu tom é caloroso, poético, rústico e altamente refinado (gourmet). Suas avaliações devem despertar o paladar e remeter ao frescor do campo e do pomar orgânico. Forneça o resultado estritamente em formato JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["nomeDoProduto", "avaliacaoDoChef", "historiaSabor", "harmonizacaoSugerida", "visualRotulo", "medidorEquilibrio"],
          properties: {
            nomeDoProduto: {
              type: Type.STRING,
              description: "Um nome de produto super poético, bucólico e refinado em português para a geleia criada."
            },
            avaliacaoDoChef: {
              type: Type.STRING,
              description: "Uma avaliação calorosa, encorajadora e profunda sobre a sinergia aromática e gustativa dos ingredientes escolhidos (máximo 4 sentenças)."
            },
            historiaSabor: {
              type: Type.STRING,
              description: "Uma narrativa poética de 1 ou 2 parágrafos de como esse sabor foi colhido e produzido na fazenda, remetendo aos pomares da Doce Colheita."
            },
            harmonizacaoSugerida: {
              type: Type.STRING,
              description: "Dicas de harmonização gourmet (ex: tipos de queijos como camembert, queijo de cabra, torradas rústicas sourdough, vinhos ou chás)."
            },
            visualRotulo: {
              type: Type.STRING,
              description: "Uma descrição curta focada em design de rótulo para esta geleia (cores, ilustrações representativas, acabamento em corda)."
            },
            medidorEquilibrio: {
              type: Type.OBJECT,
              required: ["acidez", "docura", "intensidadeEspeciarias"],
              properties: {
                acidez: {
                  type: Type.INTEGER,
                  description: "Valor de 1 a 10 representando o nível de acidez da geleia."
                },
                docura: {
                  type: Type.INTEGER,
                  description: "Valor de 1 a 10 representando a doçura percebida."
                },
                intensidadeEspeciarias: {
                  type: Type.INTEGER,
                  description: "Valor de 1 a 10 para o impacto de especiarias e aromáticos."
                }
              }
            }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Chef Sommelier Error:", error);
    res.status(500).json({
      error: "O Chef Sommelier está nos pomares agora. Tente novamente em breve!",
      details: error.message
    });
  }
});

// Serve simulated Order checkout
app.post("/api/checkout", (req, res) => {
  const { customer, items, total, customOrderDetails } = req.body;
  
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
