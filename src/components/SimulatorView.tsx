import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calculator, 
  Warehouse, 
  PackageCheck, 
  Route, 
  Globe, 
  RefreshCw, 
  Bot, 
  Trophy, 
  Sparkles, 
  Coins, 
  Award, 
  ThumbsUp, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Play,
  CheckCircle,
  Info,
  Layers,
  ArrowRight,
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface SimulatorViewProps {
  lang: 'es' | 'en';
}

interface StageSimulation {
  id: number;
  titleEn: string;
  titleEs: string;
  icon: any;
  conceptEn: string;
  conceptEs: string;
  scenarioTitleEn: string;
  scenarioTitleEs: string;
  scenarioDescEn: string;
  scenarioDescEs: string;
  options: {
    labelEn: string;
    labelEs: string;
    feedbackEn: string;
    feedbackEs: string;
    cashEffect: number;
    efficiencyEffect: number;
    csatEffect: number;
    success: boolean;
  }[];
}

export default function SimulatorView({ lang }: SimulatorViewProps) {
  // Global Metricas of the Amazon-style business simulated empire: "AmLogLogix"
  const [cash, setCash] = useState<number>(65000);
  const [efficiency, setEfficiency] = useState<number>(75); // percentage
  const [csat, setCsat] = useState<number>(3.8); // stars out of 5
  const [deliveries, setDeliveries] = useState<number>(120);
  const [currentLevel, setCurrentLevel] = useState<number>(0); // active selected tab
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  
  // Game state for simulation trigger
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<{
    cash: number;
    eff: number;
    sat: number;
    desc: string;
    isSuccess: boolean;
  } | null>(null);

  // Trivia states for interactive quick checks
  const [triviaAnswers, setTriviaAnswers] = useState<Record<number, number>>({});
  const [triviaGraded, setTriviaGraded] = useState<Record<number, boolean>>({});

  // Mini-game/Interactive states for different levels
  // Stage 1: Demand forecaster states
  const [seasonalFactor, setSeasonalFactor] = useState<number>(1.2);
  const [marketingBoost, setMarketingBoost] = useState<number>(1.5);
  const [predictedDemand, setPredictedDemand] = useState<number>(3500);
  const actualTargetDemand = 3600;

  // Stage 2: ABC classification checklist
  const [inventoryABC, setInventoryABC] = useState<Record<string, 'A' | 'B' | 'C' | ''>>({
    'Sapphire Screen': '',
    'Packaging Box': '',
    'Microprocessor': '',
    'Sticker Pack': '',
    'Premium Laser': '',
  });
  const correctABC = {
    'Sapphire Screen': 'A',
    'Packaging Box': 'C',
    'Microprocessor': 'A',
    'Sticker Pack': 'C',
    'Premium Laser': 'A',
  };
  const [abcChecked, setAbcChecked] = useState(false);

  // Stage 3: Aisle layout flow state
  const [fastMovingPlacement, setFastMovingPlacement] = useState<'front' | 'back' | 'top'>('back');
  const [layoutRating, setLayoutRating] = useState<string>('');

  // Stage 4: Picking path puzzle
  const [pickingOrder, setPickingOrder] = useState<string[]>([]);
  const optimalPickingOrder = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];

  // Stage 5: Transportation Matrix
  const [selectedTransit, setSelectedTransit] = useState<'sea' | 'air' | 'truck' | null>(null);

  // Stage 7: Reverse decisions
  const [returnStatus, setReturnStatus] = useState<string>('');

  // Stage 8: Robot autonomous simple coding instructions path
  const [robotCode, setRobotCode] = useState<string[]>([]);
  const [robotGridPos, setRobotGridPos] = useState({ r: 2, c: 0 }); // Target is at { r:0, c: 3 }
  const [robotLogs, setRobotLogs] = useState<string[]>([]);

  // 8 Levels/Chapters definitions
  const STAGES: StageSimulation[] = [
    {
      id: 1,
      titleEn: "1. Demand Forecast & Sourcing",
      titleEs: "1. Planificación y Compras",
      icon: TrendingUp,
      conceptEn: "Forecasting computes historical seasonal trends and viral marketing multipliers to project stock inventory depth. Sourcing requires evaluating suppliers, negotiating raw material pricing, and aligning factory output to prevent capital freezes or costly backorders.",
      conceptEs: "La predicción calcula tendencias temporales históricas y multiplicadores de marketing para proyectar el inventario. Las compras evalúan proveedores de materia prima y configuran el ritmo de fábrica para evitar congelar caja o sufrir roturas de stock caro.",
      scenarioTitleEn: "Q3 Sales Spurt: Black Friday Sourcing Plan",
      scenarioTitleEs: "Pico de Ventas Q3: Abastecimiento Black Friday",
      scenarioDescEn: "Your virtual Amazon storefront expects a major electronics surge. Sourcing incorrectly will either lock up raw material capital or lead to delays (shipping air cargo to catch up will devour all profit margins!).",
      scenarioDescEs: "Tu tienda virtual tipo Amazon anticipa un pico inmenso en electrónica. Si compras mal, o congelarás dinero en cajas ociosas, o tendrás retrasados y pagar fletes aéreos express que devorarán tu margen.",
      options: [
        {
          labelEn: "Aggressive Sourcing with 30% safety stock via high-capacity, reliable partners (Higher unit cost, lower bottleneck risk)",
          labelEs: "Compra agresiva con stock de seguridad del 30% usando proveedores certificados (Mayor costo unitario pero sin cuellos de botella)",
          feedbackEn: "Brilliant strategy! Customer satisfaction held steady at 4.6. Safe, buffers secured, and supply matches high-volume demand organically.",
          feedbackEs: "¡Excelente estrategia! La satisfacción del cliente se mantuvo en 4.6. Estabilidad de stock óptimo y flete terrestre seguro.",
          cashEffect: -8000,
          efficiencyEffect: 15,
          csatEffect: 0.6,
          success: true
        },
        {
          labelEn: "Just-In-Time (JIT) minimal orders with zero safety buffer (Lowest holding cost, highest stock-out risk)",
          labelEs: "Producción Justo a Tiempo (JIT) mínima sin stock de seguridad (Cero costo de almacenaje pero riesgo extremo de desabastecimiento)",
          feedbackEn: "Disastrous! A storm delayed bulk component transit. Customers faced backorders, leaving 1-star reviews. You lost $12k in potential sales.",
          feedbackEs: "¡Desastre! Una tormenta retrasó el lote. Clientes enojados dejaron reseñas de 1 estrella por falta de stock. Perdiste $12k en ventas.",
          cashEffect: -12000,
          efficiencyEffect: -10,
          csatEffect: -0.9,
          success: false
        },
        {
          labelEn: "Pre-order raw material parts from unvetted low-cost factories to maximize margins (Longer lead time, lower build reliability)",
          labelEs: "Comprar materiales baratos a fábricas no auditadas para exprimir márgenes (Plazos largos de envío, calidad inestable)",
          feedbackEn: "Moderate. Raw parts arrived but 15% were defective. Factory runs stalled while waiting for replacements. Efficiencies dropped.",
          feedbackEs: "Regular. Las piezas llegaron pero el 15% falló la inspección de calidad inicial. Tuviste que esperar repuestos mermando eficiencia.",
          cashEffect: -4000,
          efficiencyEffect: 2,
          csatEffect: -0.2,
          success: true
        }
      ]
    },
    {
      id: 2,
      titleEn: "2. Inventory Management Math",
      titleEs: "2. Control y Fórmulas de Inventario",
      icon: Calculator,
      conceptEn: "Holding costs reflect the exact dollar penalties of storing idle boxes (depreciation, rent, insurance). The Reorder Point (ROP) equation uses historical average daily sales and lead times to calculate when to replenish stock automatically.",
      conceptEs: "El costo de mantener inventario refleja la penalidad de almacenar cajas paradas (renta, depreciación, merma). La fórmula del Punto de Reorden (ROP) multiplica la demanda promedio diaria por los días de tránsito para emitir alertas automatizadas de compra justo a tiempo.",
      scenarioTitleEn: "Reorder Points vs. Warehouse Holding Penalties",
      scenarioTitleEs: "Punto de Reorden vs. Costos de Almacenamiento",
      scenarioDescEn: "Your inventory tracking dashboard notes high storage fees due to 'Dead Stock' clog of bulky items, while your top-selling electronics are running critically dangerously low.",
      scenarioDescEs: "Tu inventario revela penalizaciones altas de almacenamiento por un 'bloqueo de productos lentos' (Dead Stock), mientras que los chips estrella se están agotando rápidamente.",
      options: [
        {
          labelEn: "Perform ABC Classification. Liquidate idle Class C inventory to free space; calibrate dynamic ROP automatic alerts on Class A",
          labelEs: "Realizar Clasificación ABC. Liquidar mercancía C lenta para liberar espacio, y automatizar ROPs digitales de alta precisión para el grupo A",
          feedbackEn: "Masterclass execution! Freed up 25% physical floor space, recovered locked cash, and zeroed out backorder alarms completely.",
          feedbackEs: "¡Cátedra logística! Liberaste 25% de espacio real, recuperaste liquidez y eliminaste alertas de rotura para productos Premium.",
          cashEffect: 18000,
          efficiencyEffect: 22,
          csatEffect: 0.5,
          success: true
        },
        {
          labelEn: "Ignore classification and double orders for all SKUs to avoid thinking about mathematical formulas",
          labelEs: "Ignorar la clasificación y duplicar el pedido de todos los productos para no calcular complejas fórmulas",
          feedbackEn: "Terrible. Your Rotterdam and Singapore warehouse status hit 99% capacity. Holding costs spiked, eating away at your profit margins.",
          feedbackEs: "Fatal. Los almacenes de Rotterdam y Singapur colapsaron al 99% de capacidad. Las tarifas de renta penalizada liquidaron tus ingresos.",
          cashEffect: -15000,
          efficiencyEffect: -18,
          csatEffect: 0.1,
          success: false
        },
        {
          labelEn: "Discontinue holding safety stock buffers to save 100% on warehouse rental fees",
          labelEs: "Eliminar por completo el stock de seguridad para ahorrar tarifas de renta",
          feedbackEn: "Risky. Your storage costs went to zero, but minor port cargo queue spikes immediately caused severe stockouts on best-selling items.",
          feedbackEs: "Riesgoso. El gasto de almacenaje bajó, pero demoras ligeras en el puerto causaron desabasto masivo en productos top.",
          cashEffect: 1000,
          efficiencyEffect: -5,
          csatEffect: -0.7,
          success: false
        }
      ]
    },
    {
      id: 3,
      titleEn: "3. Warehouse Layout Design",
      titleEs: "3. El Almacén: Estantes y Códigos",
      icon: Warehouse,
      conceptEn: "Smart layout configurations align shelves to separate high-churn item channels. Fast check-in systems check SKU codes at the doors automatically, converting dock-to-stock latency from hours into seconds.",
      conceptEs: "El diseño inteligente acomoda estanterías para optimizar el picking rápido. El ingreso (Receiving) asocia cada caja entrante de la fábrica con códigos QR y de barras vinculándolos con la ubicación digital exacta para montacargas.",
      scenarioTitleEn: "Congested Aisles: The Rotterdam Warehouse Bottleneck",
      scenarioTitleEs: "Pasillos Congestionados: El Caos de Rotterdam",
      scenarioDescEn: "Worker picking times are rising exponentially. Forklifts are getting stuck in common intersections, and newly arrived inventory at docks takes 2 days to get tracked inside systems.",
      scenarioDescEs: "El tiempo de recolección sube sin control. Los montacargas chocan en calles congestionadas y el inventario entrante tarda 2 días en reflejarse en los sistemas.",
      options: [
        {
          labelEn: "Implement Cross-Docking patterns, reorganize fast-savers at the direct front, and install automated barcode-matching systems",
          labelEs: "Establecer Cross-Docking en el muelle, acomodar productos de alta rotación al frente y digitalizar con códigos bidimensionales en tiempo real",
          feedbackEn: "Excellent optimization! Fulfillment travel distance dropped by 40%. Pallet processing takes minutes instead of days now.",
          feedbackEs: "¡Optimización excepcional! La distancia física recorrida bajó 40%. Los camiones descargan y registran mercancía en minutos.",
          cashEffect: -6000,
          efficiencyEffect: 28,
          csatEffect: 0.4,
          success: true
        },
        {
          labelEn: "Hire extra seasonal floor workers with hand-written paper inventory logs to manually find boxes",
          labelEs: "Contratar más recolectores manuales usando hojas de papel hechas a mano para rastrear la mercancía",
          feedbackEn: "Inflow of human errors! Hand-written paper notes led to lost items, wrong inventory counts, and double warehouse tracking errors.",
          feedbackEs: "¡Alud de fallos humanos! Apuntar ubicaciones a lápiz causó pérdidas, duplicados y descontrol de stock en estantería.",
          cashEffect: -5000,
          efficiencyEffect: -12,
          csatEffect: -0.3,
          success: false
        },
        {
          labelEn: "Re-locate the physical warehouse to a cheaper, rural location 150 miles away from city hubs to cut rent costs",
          labelEs: "Mudar el almacén físico a una zona rural a 250km de la ciudad para pagar la mitad de renta",
          feedbackEn: "Rent became ultra cheap, but freight transit times to cities tripled. Shipping costs skyrocketed, wiping out the rent savings entirely.",
          feedbackEs: "La renta bajó, pero el costo del transporte de última milla se triplicó. Los tiempos de despacho colosales irritaron al cliente.",
          cashEffect: -2000,
          efficiencyEffect: -8,
          csatEffect: -0.6,
          success: false
        }
      ]
    },
    {
      id: 4,
      titleEn: "4. Picking & Packing Excellence",
      titleEs: "4. Preparación de Pedidos (Empacado)",
      icon: PackageCheck,
      conceptEn: "Picking represents selecting the correct physical SKUs (using methodologies like Wave, Batch, or Zone pick). Packing protects items with custom anti-damage materials to reduce return triggers.",
      conceptEs: "Picking es el surtido o búsqueda ágil de productos (por olas o zonas). El Packing es el embalado seguro y optimización de cajas acolchadas para evitar abolladuras de camino al cliente.",
      scenarioTitleEn: "Damaged Deliveries & Broken Items Backlash",
      scenarioTitleEs: "Accidentes de Camino: Artículos Rotos",
      scenarioDescEn: "Your shipping dashboard reports that 8% of glass display and electronic products are arriving smashed or with ruined custom retail boxes, hurting ratings.",
      scenarioDescEs: "Las estadísticas marítimas acusan que el 8% de los artículos de óptica y silicio llegan golpeados u oxidados, disparando reclamaciones.",
      options: [
        {
          labelEn: "Standardize standardized padded bubble cardboard packaging and design algorithmic picking paths to route staff efficiently",
          labelEs: "Estandarizar empaque de cartón rígido con acolchado neumático de burbujas e implantar pasillos de picking algorítmico",
          feedbackEn: "Perfect choice! Product return rates dropped to 0.4%. Operational transit satisfaction is beautiful and packing velocities zoomed up.",
          feedbackEs: "¡Gran decisión! Devoluciones bajaron al 0.4%. El embalaje hermético salvó la electrónica fina y el ruteo ahorró fatiga física.",
          cashEffect: -3500,
          efficiencyEffect: 20,
          csatEffect: 0.8,
          success: true
        },
        {
          labelEn: "Instruct pickers to run faster between aisles and wrap items in thin plastic film bags to save weight",
          labelEs: "Pedirle a los recolectores que corran más rápido en el pasillo y envolver todo en bolsas de plástico delgadas para aliviar peso",
          feedbackEn: "Safety violations! Two workers tripped, picking productivity slowed, and thin plastic failed to prevent shocks, doubling retail damage complaints.",
          feedbackEs: "¡Riesgo de accidente! Empleados fatigados y envolturas baratas causaron cajas rotas, lo que duplicó quejas y reposiciones.",
          cashEffect: -6000,
          efficiencyEffect: -15,
          csatEffect: -0.8,
          success: false
        },
        {
          labelEn: "Limit shipping only list products which are unbreakable to avoid needing protective packing materials",
          labelEs: "Restringir la tienda a vender únicamente cosas de metal o plástico duro irrompible para ahorrar plástico burbuja",
          feedbackEn: "You saved on packaging, but sales plummeted because you cancelled optical lens systems and high-value computer processors.",
          feedbackEs: "Ahorraste burbujas, pero cancelaste tus artículos de mayor margen (óptica y electrónica de alta gama) y tus ingresos cayeron 40%.",
          cashEffect: -12000,
          efficiencyEffect: 5,
          csatEffect: -0.4,
          success: false
        }
      ]
    },
    {
      id: 5,
      titleEn: "5. Freight Allocation & Last Mile",
      titleEs: "5. Transporte y la Última Milla",
      icon: Route,
      conceptEn: "Fulfillment requires balancing transit cost/speed between Sea (slow but cheap), Air (highly fast but extremely expensive/high footprint), and Road. Last Mile is the single most expensive route leg, requiring perfect scheduling.",
      conceptEs: "Llevar la mercancía del punto A al B balancea coste vs. velocidad: Marítimo (lento pero barato), Aéreo (veloz de alto costo) o Terrestre. La 'Última Milla' es la fase más costosa e ineficiente, exigiendo rutas lógicas.",
      scenarioTitleEn: "Unforeseen Weather: Suez Canal Obstruction Risk",
      scenarioTitleEs: "Inclemencias Marítimas: Emergencias en Tránsito",
      scenarioDescEn: "Climate alerts and route blocks threaten to delay 2,500 priority consumer modules. A delayed delivery risks losing retail contracts.",
      scenarioDescEs: "Un bloqueo climático de paso intermedio amenaza con demorar 2,500 módulos prioritarios de silicio. Si te retrasas, perderás contratos de distribuidores.",
      options: [
        {
          labelEn: "Split risks: Route 20% high-priority via express Air Freight, and re-route remaining 80% Sea cargo around safe oceanic lanes",
          labelEs: "Diversificar riesgo: Enviar 20% crítico por Aire Express, e instruir desvíos marítimos preventivos para el resto",
          feedbackEn: "Masterful strategy. Your key customers received their items on time. The average transit safely adjusted without shipping cost spikes.",
          feedbackEs: "Estrategia de ajedrecista. Los clientes prémium recibieron su carga vía aérea y el barco de Rotterdam evitó cuellos de botella.",
          cashEffect: -5000,
          efficiencyEffect: 18,
          csatEffect: 0.7,
          success: true
        },
        {
          labelEn: "Panic and upgrade the entire shipment of heavy metal materials to private Air Cargo jets",
          labelEs: "En pánico, cambiar todo el embarque marítimo pesado a aviones charter de transporte urgente",
          feedbackEn: "Financially ruinous! You paid $25,000 in fuel surcharges and flight freight. The cargo arrived, but shipping costs completely destroyed profits.",
          feedbackEs: "¡Ruinosa quiebra financiera! Los recargos de flete e inflados costos de combustible de flete aéreo liquidaron $25k de caja bruta.",
          cashEffect: -25000,
          efficiencyEffect: 5,
          csatEffect: 0.9,
          success: false
        },
        {
          labelEn: "Wait in the channel and hope the route clears up spontaneously without taking preventative action",
          labelEs: "Esperar anclados en el canal y esperar que el clima se despeje solo sin cambiar el plan de ruta",
          feedbackEn: "Inactive error. Delayed by 17 days. Consignees filed breach of service level agreements, charging manual late penalty fees.",
          feedbackEs: "Error por inacción. Quedaron varados 17 días. Los clientes activaron penalizaciones contractuales por retraso desmedido.",
          cashEffect: -15000,
          efficiencyEffect: -25,
          csatEffect: -1.2,
          success: false
        }
      ]
    },
    {
      id: 6,
      titleEn: "6. International Trade & Customs",
      titleEs: "6. Logística Internacional y Aduanas",
      icon: Globe,
      conceptEn: "Crossing borders implies paying duties, submitting commercial invoices, and defining Incoterms. Incoterms settle where risk transfers: EXW (buyer takes all), FOB (seller delivers to deck), or DDP (seller delivers cleared).",
      conceptEs: "Cruzar fronteras requiere cumplir aduanas, aranceles y definir Incoterms estándar de comercio. Los Incoterms dictan seguros y riesgos: EXW (comprador recoge), FOB (vendedor sube a barco), u DDP (vendedor entrega libre de impuestos).",
      scenarioTitleEn: "Border Block: Consignments Trapped in Customs Clearance",
      scenarioTitleEs: "Retenidos en Aduana: Incomunicación y Documentos",
      scenarioDescEn: "A large shipment of premium cameras is stranded at Rotterdam customs. Inspectors claim mismatched values on customs invoices and missing certifications.",
      scenarioDescEs: "Un contenedor de lentes ópticos de precisión está retenido en la aduana europea por inconsistencias en la factura de origen y falta de Incoterms claros.",
      options: [
        {
          labelEn: "Establish DDP (Delivered Duty Paid) with certified customs brokers, securing prepaid clearance documentation in advance",
          labelEs: "Cambiar contratos a DDP (Delivered Duty Paid) asistidos por un agente aduanal certificado para preconvalidar facturas",
          feedbackEn: "Stellar custom compliance! Stranded containers were released inside 6 hours. Perfect documentation flows avoided administrative fine traps.",
          feedbackEs: "¡Cumplimiento impecable! El contenedor fue desaduanado en 6 horas. Documentos preconvalidados evitaron multas gubernamentales.",
          cashEffect: -5000,
          efficiencyEffect: 25,
          csatEffect: 0.5,
          success: true
        },
        {
          labelEn: "Shift blame to the client by using EXW (Ex-Works) and let them draft international customs paperwork alone",
          labelEs: "Pasar la responsabilidad al cliente final usando Incoterm EXW (Ex-Works) y dejarlos lidiar con aduanas solos",
          feedbackEn: "Terrible. Individual customers received complicated legal demands from border agencies. 90% cancelled their orders with chargeback requests.",
          feedbackEs: "Malísimo. Tus compradores recibieron intimaciones de hacienda para pagar impuestos sorpresa. Hubo cancelaciones de compras del 90%.",
          cashEffect: -14000,
          efficiencyEffect: -20,
          csatEffect: -1.5,
          success: false
        },
        {
          labelEn: "Bribe local seaport officials to skip product inspections quickly and save on tax declarations",
          labelEs: "Intentar sobornar a inspectores locales para saltar revisiones y evadir impuestos de importación",
          feedbackEn: "CRITICAL COMPLIANCE AUDIT EXPOSED! Your cargo was blacklisted and confiscated permanently. You paid $30,000 in heavy legal fines.",
          feedbackEs: "¡FRAUDE EXPUESTO EN AUDITORÍA! Aduanas confiscó tu mercancía completa permanentemente. Pagaste multas legales devastadoras.",
          cashEffect: -30000,
          efficiencyEffect: -40,
          csatEffect: -2.0,
          success: false
        }
      ]
    },
    {
      id: 7,
      titleEn: "7. Reverse Logistics (Returns Map)",
      titleEs: "7. Logística Inversa (Devoluciones)",
      icon: RefreshCw,
      conceptEn: "Reverse operations require sorting returns carefully. Instead of landfilling, smart companies inspect and route items: refurbished sale, raw parts recycling, discount open-box listing, or liquidating responsibly.",
      conceptEs: "La logística inversa gestiona el flujo de bienes que regresan. Tras certificar fallas, se decide de forma inteligente: reconstrucción y venta certificada (refurbished), reciclado de componentes o descarte.",
      scenarioTitleEn: "Sartorial Mishaps: Floods of Dissatisfied Customer Returns",
      scenarioTitleEs: "Avalancha de Regresos: Devoluciones sin Control",
      scenarioDescEn: "Post-holiday reviews trigger return spikes. Restocking manually is clogging your physical space without any clear product diagnostics.",
      scenarioDescEs: "Un incremento del 15% en devoluciones satura los andenes de descarga tras la campaña Navideña. La mercancía devuelta se acumula como merma.",
      options: [
        {
          labelEn: "Setup a Diagnostic Center. Tier returns: Refurbish high-value electronics to resell as 'Certified Open-Box', and recycle the remainder",
          labelEs: "Montar Centro de Diagnóstico. Clasificar: Reparar y re-vender gadgets premium como Refurbished (Estilo Outlet/Open-Box) y reciclar resto",
          feedbackEn: "Remarkable recovery! You reclaimed 65% of raw manufacturing material net asset costs and cleared processing floor piles safely.",
          feedbackEs: "¡Recuperación espectacular! Reclamaste el 65% del valor neto de reventa de la mercancía, reduciendo fugas y recuperando capital.",
          cashEffect: 12000,
          efficiencyEffect: 16,
          csatEffect: 0.6,
          success: true
        },
        {
          labelEn: "Incinerate 100% of returned items to avoid spent diagnostics overhead or catalog refurbishing hours",
          labelEs: "Incinera y desecha el 100% de productos devueltos para no gastar tiempo en revisar y reempaquetar",
          feedbackEn: "Ruinous. Environment agencies fined your business for illegal landfilling waste, and you threw thousands of dollars of repairable electronics.",
          feedbackEs: "Negligente. Además de tirar miles de dólares en componentes óptimos reparables, recibiste denuncias y multas ambientales.",
          cashEffect: -18000,
          efficiencyEffect: -10,
          csatEffect: -0.4,
          success: false
        },
        {
          labelEn: "Refuse to accept any returns and forbid refund claims entirely to protect cash balance",
          labelEs: "Negar reembolsos y prohibir las devoluciones por completo para proteger el saldo de la caja",
          feedbackEn: "Financial suicide! Your credit card gateway blockaded your merchant account due to high chargebacks. Reputation collapsed on reviews.",
          feedbackEs: "Suicidio comercial. Las pasarelas de pago suspendieron tu cuenta por fraudes de contracargo y las redes sociales te destrozaron.",
          cashEffect: -25000,
          efficiencyEffect: -30,
          csatEffect: -2.3,
          success: false
        }
      ]
    },
    {
      id: 8,
      titleEn: "8. Digital Tech & Robotics AI",
      titleEs: "8. Tecnología en Logística: Robots e IoT",
      icon: Bot,
      conceptEn: "Modern systems employ automated guided vehicles (AMR), live RFID tracking sensors, Smart Logistics maps, and telemetry networks to schedule dock loading hours dynamically. These allow fully seamless operations.",
      conceptEs: "El futuro de las megacadena de suministro integra robots clasificadores, RFID, mapas inteligentes y robots móviles que cargan estantes solos, convirtiendo los almacenes en coreografías de alta precisión.",
      scenarioTitleEn: "Black Friday Spike: Fully Automated Fulfillment Shift",
      scenarioTitleEs: "Black Friday Robótico: Escalar Capacidad de Manera Brutal",
      scenarioDescEn: "Weekly online orders surged exponentially. Human pickers are exhausted, errors are spiking, and inventory updates are lagging on screens.",
      scenarioDescEs: "Los pedidos suben exponencialmente. El personal sufre fatiga extrema por caminar kilómetros diarios, lo que causa retrasos en las entregas.",
      options: [
        {
          labelEn: "Invest in Automated Guided Vehicles (AMRs/Robots) mapping stock routes, matching live telemetry tracking sensors",
          labelEs: "Invertir en Flotas de Robots Almaceneros (AMR) auto-guiados y sensores de rastreo de calor/pasillo con telemetría activa",
          feedbackEn: "Invaluable tech transition! Operating speeds increased by 400%. Labor fatigue evaporated and your storefront handles volume seamlessly.",
          feedbackEs: "¡Revolución industrial exitosa! Los tiempos de picking bajaron de horas a 90 segundos. Los robots asumen la carga física pesada.",
          cashEffect: -12000,
          efficiencyEffect: 45,
          csatEffect: 1.0,
          success: true
        },
        {
          labelEn: "Buy cheap second-hand delivery drone prototypes that crash frequently in bad weather",
          labelEs: "Comprar drones de reparto baratos de segunda mano que se estrellan constantemente con la lluvia",
          feedbackEn: "Ouch. Several drones dropped valuable microprocessors onto highways and neighbor lawns. Lawsuits and regulatory bans followed.",
          feedbackEs: "Grave error. Los drones baratos soltaron paquetes de lentes caros sobre autopistas públicas. Tuviste demandas y quejas serias.",
          cashEffect: -15000,
          efficiencyEffect: -5,
          csatEffect: -0.8,
          success: false
        },
        {
          labelEn: "Decline implementing automation, relying on manual clipboards forever",
          labelEs: "Rechazar toda tecnología digital y mantener el control de inventario en papel carbón para siempre",
          feedbackEn: "Obsolete. Competitors with fulfillment robot fleets are offering same-day deliveries, while your delivery catalog remains stuck in weeks.",
          feedbackEs: "Obsolescencia total. Tus rivales robóticos ofrecen envío el mismo día mientras tú tardas semanas en buscar cajas con linternas.",
          cashEffect: -8000,
          efficiencyEffect: -25,
          csatEffect: -1.1,
          success: false
        }
      ]
    }
  ];

  // Stage trivia questions to lock learning
  const TRIVIA_QUESTIONS = [
    {
      qEn: "Which of the following is the single primary goal of Sales Forecasting?",
      qEs: "¿Cuál es el objetivo principal de la Predicción de Ventas (Sales Forecasting)?",
      optsEn: ["To eliminate raw material costs completely", "To calculate future sales to buy optimal levels and avoid locked capital or stock outs", "To replace factory machine operators"],
      optsEs: ["Eliminar por completo los costos de materia prima", "Predecir la demanda futura para comprar lo óptimo sin congelar caja ni desabastecerse", "Reemplazar al personal de la fábrica"],
      currectIdx: 1
    },
    {
      qEn: "In ABC inventory classification, what characterizes 'Class A' items?",
      qEs: "En la clasificación de inventarios ABC, ¿qué caracteriza a los artículos de 'Clase A'?",
      optsEn: ["They are low-value items that rotate extremely slowly", "They are high-value products that represent the majority of total sales value", "They represent trash that must be thrown away"],
      optsEs: ["Son artículos baratos que rotan lento o casi no se venden", "Son productos de alto valor que concentran la mayor inversión y ventas de la empresa", "Son cajas vacías de cartón sin valor"],
      currectIdx: 1
    },
    {
      qEn: "Which of the following describes the 'Receiving' process at a warehouse?",
      qEs: "En el almacenamiento, ¿qué proceso define la fase de 'Recibir y Revisar' (Receiving)?",
      optsEn: ["Mailing promotional flyers to city customers", "Unloading stock from factory shippers, inspecting physical count/condition, and digital registration", "Throwing damaged returned garbage straight to landfill"],
      optsEs: ["Repartir folletos publicitarios en las calles", "Descargar contenedores de fábrica, verificar estado físico y cantidad, e ingresarlos al sistema digital", "Tirar mermas directamente a la basura"],
      currectIdx: 1
    },
    {
      qEn: "What is the key functional difference between Picking and Packing?",
      qEs: "¿Cuál es la diferencia fundamental entre el 'Picking' y el 'Packing'?",
      optsEn: ["There is no difference, they are synonyms", "Picking is compiling raw customer items from shelves; Packing is wrapping and sizing safe travel cushioning boxes", "Picking is shipping via airplane, Packing is shipping via ocean cargo"],
      optsEs: ["Son términos idénticos e intercambiables en español", "Picking es buscar los productos en estantes; Packing es empacarlos de forma segura en cajas duraderas", "Picking es transporte aéreo y Packing es transporte marítimo"],
      currectIdx: 1
    },
    {
      qEn: "Why is the 'Last Mile' delivery leg considered the most expensive phase of distribution?",
      qEs: "¿Por qué la entrega de 'Última Milla' es usualmente la fase más cara de la cadena?",
      optsEn: ["Because airplane fuel costs are incredibly cheap", "Because it involves custom door-to-door drops, complex urban fuel delays, and tiny individual parcels", "Because international borders collect high maritime customs on individual homes"],
      optsEs: ["Porque el queroseno de los barcos de alta mar es gratis", "Porque consiste en entregas individuales personalizadas, rutas urbanas complejas e ineficiencias de tráfico", "Porque los carteros de aduanas cobran fletes transcontinentales a domicilio"],
      currectIdx: 1
    },
    {
      qEn: "If you agree on a 'DDP' (Delivered Duty Paid) Incoterm contract, who assumes compliance hazard and custom duties?",
      qEs: "Bajo el Incoterm 'DDP' (Delivered Duty Paid), ¿quién asume los costos, impuestos y riesgos de aduanas?",
      optsEn: ["The buyer pays everything at their local door", "The seller takes full responsibility to deliver cleared goods up to destination", "A third-party ocean carrier assumes all customs legal risks for free"],
      optsEs: ["El comprador paga todo en efectivo al repartidor local", "El vendedor asume toda la responsabilidad, pago de permisos e impuestos hasta entregar la carga", "El capitán del barco responde legalmente gratis"],
      currectIdx: 1
    },
    {
      qEn: "What is 'Reverse Logistics' (Logística Inversa) primarily tasked with?",
      qEs: "¿De qué se encarga principalmente la 'Logística Inversa'?",
      optsEn: ["Shipping cargo backwards at double speed", "Managing returned, defective, or customer-disliked boxes to inspect, repair, salvage or recycle them", "Banning customers who order items by mistake"],
      optsEs: ["Gobernar el timón de los barcos en reversa", "Gestionar el retorno de artículos devueltos para inspeccionarlos, reacondicionarlos o reciclarlos", "Multar y vetar a clientes que cancelen compras"],
      currectIdx: 1
    },
    {
      qEn: "Which of the following describes Autonomous Mobile Robots (AMR) in logistics?",
      qEs: "¿Qué hacen los robots móviles autónomos (AMR) en los centros de envío modernos?",
      optsEn: ["They reply to emails and design powerpoint slides", "They navigate warehouse maps to carry storage shelves directly to operators, cutting travel fatigue", "They operate commercial sea vessels autonomously"],
      optsEs: ["Contestar correos y hacer diapositivas de ventas", "Navegar de manera autónoma cargando estanterías pesadas directo al operador para ahorrar fátiga", "Reemplazar a los capitanes de barcos mercantes"],
      currectIdx: 1
    }
  ];

  const activeStage = STAGES[currentLevel];
  const activeTrivia = TRIVIA_QUESTIONS[currentLevel];

  // Run the option simulator event
  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setSimulationResult(null);
  };

  const executeSimulation = () => {
    if (selectedOption === null) return;
    setSimulating(true);
    setSimulationResult(null);

    const opt = activeStage.options[selectedOption];

    // Delay for dramatic visual progress simulation
    setTimeout(() => {
      setSimulating(false);
      
      // Update stats based on selected logistics decision
      const finalCash = Math.max(5000, cash + opt.cashEffect);
      const finalEfficiency = Math.min(100, Math.max(10, efficiency + opt.efficiencyEffect));
      const finalCsat = parseFloat(Math.min(5.0, Math.max(1.0, csat + opt.csatEffect)).toFixed(1));
      
      setCash(finalCash);
      setEfficiency(finalEfficiency);
      setCsat(finalCsat);
      setDeliveries(prev => prev + (opt.success ? 35 : 5));

      setSimulationResult({
        cash: opt.cashEffect,
        eff: opt.efficiencyEffect,
        sat: opt.csatEffect,
        desc: lang === 'es' ? opt.feedbackEs : opt.feedbackEn,
        isSuccess: opt.success
      });

      if (opt.success && !completedStages.includes(activeStage.id)) {
        setCompletedStages(prev => [...prev, activeStage.id]);
      }
    }, 1500);
  };

  const handleResetGame = () => {
    setCash(65000);
    setEfficiency(75);
    setCsat(3.8);
    setDeliveries(120);
    setCompletedStages([]);
    setSelectedOption(null);
    setSimulationResult(null);
    setTriviaAnswers({});
    setTriviaGraded({});
    // Reset mini-game statuses
    setSeasonalFactor(1.2);
    setMarketingBoost(1.5);
    setPredictedDemand(3500);
    setInventoryABC({
      'Sapphire Screen': '',
      'Packaging Box': '',
      'Microprocessor': '',
      'Sticker Pack': '',
      'Premium Laser': '',
    });
    setAbcChecked(false);
    setFastMovingPlacement('back');
    setLayoutRating('');
    setPickingOrder([]);
    setSelectedTransit(null);
    setReturnStatus('');
    setRobotCode([]);
    setRobotGridPos({ r: 2, c: 0 });
    setRobotLogs([]);
  };

  // Grade trivia quick quizzes
  const applyTriviaAnswer = (ansIdx: number) => {
    setTriviaAnswers(prev => ({ ...prev, [currentLevel]: ansIdx }));
    setTriviaGraded(prev => ({ ...prev, [currentLevel]: true }));

    // Small bonus for correct answers
    if (ansIdx === activeTrivia.currectIdx) {
      setCash(prev => prev + 2500);
      setEfficiency(prev => Math.min(100, prev + 3));
    } else {
      setCash(prev => Math.max(2000, prev - 1000));
    }
  };

  // Get professional logistics title based on Cash & Efficiency
  const getSimTitle = () => {
    const score = cash + (efficiency * 500) + (csat * 5000);
    if (score < 40000) return lang === 'es' ? 'Auxiliar de Embalaje Jr.' : 'Jr. Packing Assistant';
    if (score < 80000) return lang === 'es' ? 'Supervisor de Almacén' : 'Warehouse Floor Supervisor';
    if (score < 120000) return lang === 'es' ? 'Planificador de Rutas Senior' : 'Senior Route Architect';
    if (score < 160000) return lang === 'es' ? 'Director de Tránsito y Fronteras' : 'Suez Border Control Director';
    return lang === 'es' ? 'Director Global de Logística (C-Suite)' : 'VP of Global Logistics (Amazon Level)';
  };

  // Stage 1 Forecaster trigger math
  const calculateForecaster = () => {
    const baseline = 2000;
    const calc = Math.round(baseline * seasonalFactor * marketingBoost);
    setPredictedDemand(calc);
  };

  // Stage 2 check abc
  const checkABCOutcome = () => {
    let allCorrect = true;
    Object.keys(inventoryABC).forEach(k => {
      if (inventoryABC[k] !== correctABC[k as keyof typeof correctABC]) {
        allCorrect = false;
      }
    });
    setAbcChecked(true);

    if (allCorrect) {
      setCash(p => p + 5000);
      setEfficiency(p => Math.min(100, p + 8));
    } else {
      setEfficiency(p => Math.max(10, p - 5));
    }
  };

  // Stage 3 check layout
  const evaluateLayout = () => {
    if (fastMovingPlacement === 'front') {
      setLayoutRating(lang === 'es' ? '¡Excelente! Artículos A calientes al frente reduce trayectos de montacargas.' : 'Optimal! Placing high-demand items in the front saves thousands of walking steps.');
      setEfficiency(p => Math.min(100, p + 10));
      setCash(p => p + 3000);
    } else {
      setLayoutRating(lang === 'es' ? 'Inadecuado. Guardar mercancía activa al fondo congestiona pasillos.' : 'Inefficient. Stashing active SKUs far at the back jams deep terminal intersections.');
      setEfficiency(p => Math.max(10, p - 6));
    }
  };

  // Stage 4 picking trigger
  const addPickingPoint = (zone: string) => {
    if (pickingOrder.includes(zone)) return;
    setPickingOrder(prev => [...prev, zone]);
  };

  // Stage 5 matrix
  const handleSelectFreight = (mode: 'sea' | 'air' | 'truck') => {
    setSelectedTransit(mode);
    if (mode === 'sea') {
      setCash(p => p + 4000); // Cheap
      setEfficiency(p => Math.min(100, p - 2)); // slow
    } else if (mode === 'air') {
      setCash(p => p - 12000); // expensive
      setEfficiency(p => Math.min(100, p + 20)); // fast
    } else {
      setCash(p => p - 3000);
      setEfficiency(p => Math.min(100, p + 5));
    }
  };

  // Stage 8 Robot Code path
  const addRobotInstruction = (dir: string) => {
    setRobotCode(prev => [...prev, dir]);
  };

  const runRobotCode = () => {
    let curr = { r: 2, c: 0 };
    setRobotGridPos(curr);
    const logs: string[] = ["Robot activated. Baseline coordinate [2, 0]"];
    
    robotCode.forEach((inst, idx) => {
      if (inst === 'UP') curr.r = Math.max(0, curr.r - 1);
      if (inst === 'DOWN') curr.r = Math.min(2, curr.r + 1);
      if (inst === 'RIGHT') curr.c = Math.min(3, curr.c + 1);
      if (inst === 'LEFT') curr.c = Math.max(0, curr.c - 1);
      
      logs.push(`Step ${idx + 1}: ${inst} -> Position now at [${curr.r}, ${curr.c}]`);
    });
    
    setRobotGridPos({ ...curr });
    
    // Target is [0, 3] (top right corner parcel shelf)
    if (curr.r === 0 && curr.c === 3) {
      logs.push("SUCCESS: Target cargo fetched perfectly by automated AMR robot!");
      setCash(p => p + 8000);
      setEfficiency(p => Math.min(100, p + 12));
    } else {
      logs.push("FAIL: Robot got lost on floor aisles. Recalibrate instructions.");
    }
    setRobotLogs(logs);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-95 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -z-10"></div>
        
        <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'es' ? 'Simulador Académico Integrado' : 'Interactive Supply Chain Academy'}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-headline">
              {lang === 'es' ? 'La Ruta de Amazon Logistix' : 'The Amazon Logistics Simulator'}
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium max-w-xl">
              {lang === 'es' 
                ? 'Domina los 8 pilares primordiales del comercio mundial. Administra inventarios, calcula fletes, optimiza almacenes y automatiza flotas con robots.'
                : 'Master the 8 core pillars of international supply chains. Manage inventory, optimize warehouse paths, clear customs, and code automated mobile robots.'}
            </p>
          </div>

          <button 
            onClick={handleResetGame}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 border border-slate-700/60 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>{lang === 'es' ? 'Reiniciar Negocio' : 'Reset Simulator'}</span>
          </button>
        </div>

        {/* Global Business KPIs bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">{lang === 'es' ? 'Fondos en Caja' : 'Cash Liquidity'}</span>
            <span className="text-xl font-black text-emerald-400 font-headline">${cash.toLocaleString()}</span>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">{lang === 'es' ? 'Eficiencia Operativa' : 'Supply Efficiency'}</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-blue-400 font-headline">{efficiency}%</span>
              <div className="flex-1 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${efficiency}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">{lang === 'es' ? 'Satisfacción (CSAT)' : 'Customer CSAT'}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-amber-400 font-headline">★ {csat}</span>
              <span className="text-[10px] text-slate-400 font-mono">/ 5.0</span>
            </div>
          </div>

          <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">{lang === 'es' ? 'Envíos Entregados' : 'Delivered Orders'}</span>
            <span className="text-xl font-black text-purple-400 font-headline">{deliveries} {lang === 'es' ? 'Paquetes' : 'Parcels'}</span>
          </div>

          <div className="bg-slate-800/40 col-span-2 lg:col-span-1 p-3 rounded-2xl border border-slate-800 flex flex-col justify-center">
            <span className="text-[9px] text-slate-500 font-bold block uppercase">{lang === 'es' ? 'Rango del Operador' : 'Operations Title'}</span>
            <span className="text-xs font-extrabold text-blue-300 truncate mt-0.5">{getSimTitle()}</span>
          </div>
        </div>

        {/* Level Path progress stepper */}
        <div className="flex gap-2 py-4 mt-4 overflow-x-auto select-none no-scrollbar">
          {STAGES.map((st, idx) => {
            const isSelected = currentLevel === idx;
            const isDone = completedStages.includes(st.id);
            return (
              <button
                key={st.id}
                onClick={() => {
                  setCurrentLevel(idx);
                  setSelectedOption(null);
                  setSimulationResult(null);
                }}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : isDone
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700/60'
                }`}
              >
                <span>{st.id}</span>
                <span className="hidden sm:inline">{lang === 'es' ? st.titleEs.split('. ')[1] : st.titleEn.split('. ')[1]}</span>
                {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column View Layout: Left, Study & Decision, Right: Live Sandbox Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Stage theory and Decision Scenario */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Learning Chapter Description Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                {React.createElement(activeStage.icon, { className: "w-6 h-6 text-blue-600" })}
              </span>
              <div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {lang === 'es' ? activeStage.titleEs : activeStage.titleEn}
                </h2>
                <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                  {lang === 'es' ? 'ALMACENAMIENTO INTELIGENTE Y TRACE' : 'SUPPLY CHAIN EDUCATION SYLLABUS'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 leading-relaxed border border-slate-200/40">
              <p className="font-semibold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{lang === 'es' ? 'Abono Teórico' : 'Direct Learning Concepts'}</span>
              </p>
              {lang === 'es' ? activeStage.conceptEs : activeStage.conceptEn}
            </div>
          </div>

          {/* Interactive Game Decision Selector */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] text-rose-500 font-black uppercase tracking-widest block">
                {lang === 'es' ? 'SIMULACIÓN DE CRISIS' : 'REAL TIME CRITICAL OPTION'}
              </span>
              <h3 className="text-base font-bold text-slate-950 font-headline">
                {lang === 'es' ? activeStage.scenarioTitleEs : activeStage.scenarioTitleEn}
              </h3>
              <p className="text-slate-500 text-xs">
                {lang === 'es' ? activeStage.scenarioDescEs : activeStage.scenarioDescEn}
              </p>
            </div>

            {/* Decisions List */}
            <div className="space-y-3 pt-2">
              {activeStage.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={simulating}
                    className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-blue-50/70 border-blue-500 text-blue-950 ring-2 ring-blue-500/20 font-bold' 
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border font-bold text-[10px] shrink-0 mt-0.5 ${
                      isSelected ? 'bg-blue-600 text-white border-transparent' : 'border-slate-300 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{lang === 'es' ? opt.labelEs : opt.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Simulation Trigger button */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={executeSimulation}
                disabled={selectedOption === null || simulating}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                {simulating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{lang === 'es' ? 'Simulando Ruta...' : 'Simulating Logistics Flow...'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-white" />
                    <span>{lang === 'es' ? 'Simular Operación' : 'Run Simulation Step'}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 font-bold uppercase">
                {lang === 'es' ? 'Decisiones modifican fondos y eficiencias' : 'Your choices impact funds, CSAT, & operational speeds'}
              </p>
            </div>

            {/* Animated Output Feedback Card */}
            {simulationResult && (
              <div className={`p-5 rounded-2xl border transition-all animate-scaleUp mt-4 ${
                simulationResult.isSuccess 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="flex gap-2 items-start">
                  {simulationResult.isSuccess ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs">
                      {simulationResult.isSuccess 
                        ? (lang === 'es' ? '¡Operación Exitosa!' : 'Optimal Supply Execution') 
                        : (lang === 'es' ? 'Fallo en Suministro' : 'Supply Bottleneck Triggered')}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-700">
                      {simulationResult.desc}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-bold">
                      <span className={simulationResult.cash >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                        {simulationResult.cash >= 0 ? '+' : ''}${simulationResult.cash} Funds
                      </span>
                      <span className={simulationResult.eff >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                        {simulationResult.eff >= 0 ? '+' : ''}{simulationResult.eff}% Speed
                      </span>
                      <span className={simulationResult.sat >= 0 ? 'text-emerald-700' : 'text-rose-700'}>
                        {simulationResult.sat >= 0 ? '+' : ''}{simulationResult.sat} CSAT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Sandbox Mini-Game Widgets */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SATELLITE INTERACTIVE GAME BLOCK */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
                {lang === 'es' ? 'Módulo Interactivo Práctico' : 'Interactive Sandbox Console'}
              </h3>
              <span className="text-[9px] font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded uppercase">
                {lang === 'es' ? `Nivel ${currentLevel + 1}` : `Level ${currentLevel + 1}`}
              </span>
            </div>

            {/* Render dynamic widgets based on stage index */}
            
            {/* WIDGET 1: Plans Demand Forecaster calculator */}
            {currentLevel === 0 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Ajusta el factor estacional y la campaña publicitaria para predecir cuántos Sapphire Screens pedir.' 
                    : 'Dial season fluctuations and marketing multipliers to forecast Sapphire Screen assembly. Match target.'}
                </p>

                <div className="space-y-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>{lang === 'es' ? 'Factor de Estación' : 'Season Factor'}</span>
                      <span className="font-bold text-blue-400">{seasonalFactor}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="2.0" step="0.1" 
                      value={seasonalFactor} 
                      onChange={(e) => { setSeasonalFactor(Number(e.target.value)); calculateForecaster(); }}
                      className="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>{lang === 'es' ? 'Impulso de Marketing' : 'Marketing Ad Boost'}</span>
                      <span className="font-bold text-indigo-400">{marketingBoost}x</span>
                    </div>
                    <input 
                      type="range" min="1.0" max="2.5" step="0.1" 
                      value={marketingBoost} 
                      onChange={(e) => { setMarketingBoost(Number(e.target.value)); calculateForecaster(); }}
                      className="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-700 flex justify-between items-baseline text-xs">
                    <span>{lang === 'es' ? 'Demanda Calculada:' : 'Calculated Sourcing Demand:'}</span>
                    <span className="font-black text-amber-400 text-sm">{predictedDemand} Units</span>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{lang === 'es' ? 'Demanda Real Navideña:' : 'Actual Christmas Surge:'}</span>
                    <span className="font-mono text-emerald-400 font-bold">{actualTargetDemand} Units</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const diff = Math.abs(predictedDemand - actualTargetDemand);
                    if (diff <= 100) {
                      setCash(p => p + 6000);
                      setEfficiency(p => Math.min(100, p + 10));
                      alert(lang === 'es' ? '¡Magnífica predicción! Recibes un bono por no saturar ni desabastecer.' : 'Optimized forecast! You calibrated the perfect volume without dead stock penalization.');
                    } else {
                      alert(lang === 'es' ? 'Error. Quedó muy lejos de la demanda real del mercado.' : 'Forecast off target. You either locked cash in dead inventory or suffered consumer backorders.');
                    }
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
                >
                  {lang === 'es' ? 'Someter Pronóstico' : 'Lock Sourcing Order'}
                </button>
              </div>
            )}

            {/* WIDGET 2: ABC inventory classification */}
            {currentLevel === 1 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Clasifica como A (alto valor/vital) o C (bajo costo/lento) para optimizar el almacén.' 
                    : 'Classify inventory: A (Extreme value electronics) or C (low impact boxes/stickers).'}
                </p>

                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {Object.keys(inventoryABC).map((item) => (
                    <div key={item} className="flex justify-between items-center text-xs bg-slate-800/40 p-2 rounded-xl">
                      <span>{item}</span>
                      <div className="flex gap-1.5">
                        {(['A', 'C'] as const).map(letter => (
                          <button
                            key={letter}
                            onClick={() => setInventoryABC(prev => ({ ...prev, [item]: letter }))}
                            className={`w-7 h-7 rounded-lg text-xs font-bold leading-none cursor-pointer ${
                              inventoryABC[item] === letter
                                ? 'bg-amber-400 text-slate-900 border-none'
                                : 'bg-slate-700 text-slate-300'
                            }`}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={checkABCOutcome}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
                >
                  {lang === 'es' ? 'Validar Clasificación' : 'Verify Classification'}
                </button>

                {abcChecked && (
                  <div className="p-3 bg-slate-800 rounded-xl text-[11px] text-slate-300 text-center">
                    {lang === 'es' 
                      ? 'Las pantallas y microprocesadores son clase A, las cajas y etiquetas son clase C.' 
                      : 'Screens and microprocessors are class A, boxes and stickers are class C.'}
                  </div>
                )}
              </div>
            )}

            {/* WIDGET 3: Warehouse Layout Setup */}
            {currentLevel === 2 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? '¿Dónde acomodar los artículos Clase A (Lentes ópticos y chips de alta rotación) para despachar rápido?' 
                    : 'Where do we place Class A fast-moving modules to expedite order dispatching cycles?'}
                </p>

                <div className="grid grid-cols-3 gap-2 bg-slate-800/40 p-4 rounded-xl border border-slate-800">
                  <button 
                    onClick={() => setFastMovingPlacement('front')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      fastMovingPlacement === 'front' 
                        ? 'bg-blue-600 border-blue-400 text-white' 
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="block text-xs font-black">FRONT</span>
                    <span className="text-[9px] block text-inherit">{lang === 'es' ? 'Cerca a muelles' : 'Near loading docks'}</span>
                  </button>

                  <button 
                    onClick={() => setFastMovingPlacement('back')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      fastMovingPlacement === 'back' 
                        ? 'bg-blue-600 border-blue-400 text-white' 
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="block text-xs font-black">BACK</span>
                    <span className="text-[9px] block text-inherit">{lang === 'es' ? 'Fondo oscuro' : 'Deep warehouse'}</span>
                  </button>

                  <button 
                    onClick={() => setFastMovingPlacement('top')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      fastMovingPlacement === 'top' 
                        ? 'bg-blue-600 border-blue-400 text-white' 
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="block text-xs font-black">TOP</span>
                    <span className="text-[9px] block text-inherit">{lang === 'es' ? 'Estante alto (3er nivel)' : 'Top high rafters'}</span>
                  </button>
                </div>

                <button
                  onClick={evaluateLayout}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
                >
                  {lang === 'es' ? 'Aplicar Disposición' : 'Apply Layout Allocation'}
                </button>

                {layoutRating && (
                  <div className="p-3 bg-slate-800 rounded-xl text-[11px] text-blue-300 text-center">
                    {layoutRating}
                  </div>
                )}
              </div>
            )}

            {/* WIDGET 4: Selecting order Path */}
            {currentLevel === 3 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Crea la secuencia óptima para que el recolector arrastre los bultos por pasillos.' 
                    : 'Trace the shortest picker route sequence to harvest items without crossing streams.'}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {['Zone C', 'Zone A', 'Zone D', 'Zone B'].map(z => {
                    const isSelected = pickingOrder.includes(z);
                    return (
                      <button
                        key={z}
                        onClick={() => addPickingPoint(z)}
                        className={`p-2.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                          isSelected ? 'bg-amber-400 text-slate-900 border-amber-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {z} {isSelected && `[#${pickingOrder.indexOf(z) + 1}]`}
                      </button>
                    );
                  })}
                </div>

                {pickingOrder.length > 0 && (
                  <div className="text-[10px] bg-slate-800 p-2 rounded-xl text-slate-300 flex items-center justify-between">
                    <span className="font-semibold">{lang === 'es' ? 'Ruta de Recolección:' : 'Selected Route:'}</span>
                    <span className="font-mono text-amber-300">{pickingOrder.join(' ➔ ')}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (JSON.stringify(pickingOrder) === JSON.stringify(['Zone A', 'Zone B', 'Zone C', 'Zone D'])) {
                        setCash(p => p + 5000);
                        setEfficiency(p => Math.min(100, p + 12));
                        alert(lang === 'es' ? '¡Increíble! Surtido optimizado sin cruces ni tráfico de pasillo.' : 'Optimized picking path! Minimum travel length completed with maximum speed index.');
                      } else {
                        alert(lang === 'es' ? 'Ruta ineficiente. El recolector tuvo que dar vueltas de más.' : 'Sub-optimal traversal. Standard picker had to backtrack twice between intersections.');
                      }
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-xl cursor-pointer"
                  >
                    {lang === 'es' ? 'Despachar Surtido' : 'Submit Picking'}
                  </button>

                  <button
                    onClick={() => setPickingOrder([])}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* WIDGET 5: Lane Speed Cost matrix */}
            {currentLevel === 4 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Evalúa el balance entre Costo versus Velocidad de entrega para fletes globales.' 
                    : 'Compare freight routing dynamics. Balance cost constraints with rapid consumer requests.'}
                </p>

                <div className="space-y-2">
                  <div 
                    onClick={() => handleSelectFreight('sea')}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedTransit === 'sea' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-805 bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between font-bold">
                      <span>{lang === 'es' ? 'Flete Marítimo' : 'Ocean Cargo Vessel'}</span>
                      <span className="text-emerald-400">$-$$ (Cheap)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">15-30 days transit, perfect for heavy components</p>
                  </div>

                  <div 
                    onClick={() => handleSelectFreight('air')}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedTransit === 'air' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between font-bold">
                      <span>{lang === 'es' ? 'Flete Aéreo Express' : 'Express Air Cargo'}</span>
                      <span className="text-rose-400">$$$$ (Expensive)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">1-2 days processing, high carbon load</p>
                  </div>

                  <div 
                    onClick={() => handleSelectFreight('truck')}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedTransit === 'truck' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between font-bold">
                      <span>{lang === 'es' ? 'Flete Terrestre (Camión)' : 'Road Freight Container'}</span>
                      <span className="text-slate-400">$$ (Balanced)</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">3-7 days domestic fulfillment, last-mile standard</p>
                  </div>
                </div>
              </div>
            )}

            {/* WIDGET 6: Customs match */}
            {currentLevel === 5 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Aprende los Códigos Armonizados (HS Codes) y aranceles antes de cruzar fronteras marítimas.' 
                    : 'Match the Incoterm description to verify risk allocation parameters.'}
                </p>

                <div className="bg-slate-800 p-4 rounded-xl space-y-3 text-xs border border-slate-700">
                  <div className="flex justify-between border-b border-slate-705 border-slate-750 pb-2">
                    <span className="font-bold">EXW (Ex-Works)</span>
                    <span className="text-rose-300">{lang === 'es' ? 'Riesgo del comprador' : '100% Buyer Risk'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-750 pb-2">
                    <span className="font-bold">FOB (Free on Board)</span>
                    <span className="text-amber-300">{lang === 'es' ? 'Riesgo puerto origen' : 'Transfer at cargo deck'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">DDP (Delivered Duty Paid)</span>
                    <span className="text-emerald-300">{lang === 'es' ? 'Riesgo absoluto vendedor' : 'Seller covers duties'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* WIDGET 7: Reverse Diagnostic */}
            {currentLevel === 6 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Un cliente regresó un "Medical Cooling Unit P-2". Presiona para diagnosticar e inspeccionar estado.' 
                    : 'A consumer returned a high-grade Silicon Microprocessor. Perform inspection cycle.'}
                </p>

                <div className="bg-slate-800 p-4 rounded-xl text-center space-y-3">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 rounded text-[10px] font-bold uppercase">
                    Awaiting Diagnostic
                  </span>
                  
                  {returnStatus ? (
                    <div className="text-xs font-mono text-emerald-400 animate-slide-in">
                      {returnStatus}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">Click inspect sensor to evaluate unit...</div>
                  )}

                  <button
                    onClick={() => {
                      const diagnostics = [
                        lang === 'es' ? "ESTADO: Sellado de fábrica intacto. Derivación sugerida: Re-vender como Premium." : "DIAGNOSTIC: Original pack pristine. Suggestion: List as high-grade Open-Box.",
                        lang === 'es' ? "ESTADO: Rayaduras superficiales en carcasa. Derivación sugerida: Outlet con 20% descuento." : "DIAGNOSTIC: Light outer scuffs. Suggestion: Mark down 20% & list outlet.",
                        lang === 'es' ? "ESTADO: Filtros obstruidos. Sugerencia: Reparar con partes recicladas." : "DIAGNOSTIC: Internal filter failure. Refurbish before warehouse restocking."
                      ];
                      const rand = diagnostics[Math.floor(Math.random() * diagnostics.length)];
                      setReturnStatus(rand);
                    }}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg"
                  >
                    {lang === 'es' ? 'Correr Scan Digital' : 'Triger Diagnostic Scan'}
                  </button>
                </div>
              </div>
            )}

            {/* WIDGET 8: AMR Robotics simple code mapping */}
            {currentLevel === 7 && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-400">
                  {lang === 'es' 
                    ? 'Programa tu AMR Robot para recoger un paquete. El robot parte de [2, 0] y los estantes de carga están en [0, 3].' 
                    : 'Route the AMR bot to delivery port. Start location: [2, 0], Target parcel: [0, 3].'}
                </p>

                {/* Grid Visual */}
                <div className="grid grid-cols-4 gap-1.5 bg-slate-800 p-3 rounded-2xl w-48 mx-auto border border-slate-700">
                  {[...Array(12)].map((_, idx) => {
                    const row = Math.floor(idx / 4);
                    const col = idx % 4;
                    const isRobot = robotGridPos.r === row && robotGridPos.c === col;
                    const isTarget = row === 0 && col === 3;
                    return (
                      <div 
                        key={idx} 
                        className={`h-9 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                          isRobot 
                            ? 'bg-blue-500 text-white' 
                            : isTarget 
                              ? 'bg-amber-400 text-slate-900 border border-amber-300 animate-pulse' 
                              : 'bg-slate-700/50 text-slate-500'
                        }`}
                      >
                        {isRobot ? '🤖' : isTarget ? '📦' : `[${row},${col}]`}
                      </div>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="space-y-1">
                  <div className="flex gap-1.5 justify-center">
                    <button 
                      onClick={() => addRobotInstruction('UP')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded"
                    >
                      ▲ UP
                    </button>
                  </div>
                  <div className="flex gap-1.5 justify-center">
                    <button 
                      onClick={() => addRobotInstruction('LEFT')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded"
                    >
                      ◀ L
                    </button>
                    <button 
                      onClick={() => addRobotInstruction('RIGHT')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded"
                    >
                      R ▶
                    </button>
                    <button 
                      onClick={() => addRobotInstruction('DOWN')}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded"
                    >
                      ▼ DN
                    </button>
                  </div>
                </div>

                {/* Compiled instructions */}
                {robotCode.length > 0 && (
                  <div className="p-2 bg-slate-800 rounded-xl text-[10px] text-slate-300 break-words font-mono text-center">
                    {robotCode.join(' -> ')}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={runRobotCode}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] uppercase rounded-xl cursor-pointer"
                  >
                    {lang === 'es' ? 'Compilar & Ejecutar' : 'Compile & Run Code'}
                  </button>

                  <button
                    onClick={() => {
                      setRobotCode([]);
                      setRobotGridPos({ r: 2, c: 0 });
                      setRobotLogs([]);
                    }}
                    className="p-2 bg-slate-800 text-slate-400 rounded-xl"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* Robot logs console */}
                {robotLogs.length > 0 && (
                  <div className="bg-slate-950 p-3 rounded-xl max-h-[100px] overflow-y-auto font-mono text-[9px] text-slate-400 text-left space-y-1">
                    {robotLogs.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>

          {/* QUICK TRIVIA CHALLENGE CARD */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Award className="w-5 h-5" />
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">
                {lang === 'es' ? 'Autoevaluación Logística' : 'Conceptual Quick Check'}
              </h4>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-800 leading-tight">
                {lang === 'es' ? activeTrivia.qEs : activeTrivia.qEn}
              </p>

              <div className="space-y-2">
                {(lang === 'es' ? activeTrivia.optsEs : activeTrivia.optsEn).map((ansOpt, aIdx) => {
                  const isGraded = triviaGraded[currentLevel];
                  const chosenIdx = triviaAnswers[currentLevel];
                  const isCorrectAnswer = aIdx === activeTrivia.currectIdx;
                  const isChosen = chosenIdx === aIdx;

                  return (
                    <button
                      key={aIdx}
                      onClick={() => !isGraded && applyTriviaAnswer(aIdx)}
                      disabled={isGraded}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isGraded 
                          ? isCorrectAnswer 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' 
                            : isChosen
                              ? 'bg-rose-50 border-rose-300 text-rose-950'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{ansOpt}</span>
                      {isGraded && isCorrectAnswer && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              {triviaGraded[currentLevel] && (
                <p className="text-[10px] text-slate-500 font-bold uppercase text-center mt-2">
                  {triviaAnswers[currentLevel] === activeTrivia.currectIdx 
                    ? (lang === 'es' ? '¡CORRECTO! Ganaste +$2.5k de capital operativo' : 'CORRECT! Secure learning reward +$2,500 granted') 
                    : (lang === 'es' ? 'Incorrecto. -$1k de capital por re-inscripción' : 'Wrong answer. -$1,050 training penalty')}
                </p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
