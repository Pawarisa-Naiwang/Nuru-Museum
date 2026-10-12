/**
 * GRURU MUSEUM — INTERACTIVE ENGINE
 * Features:
 * 1. Ambient Hero Particle Constellation
 * 2. Guided Data Booming Radial Engine (40ms Stagger + Drilldown)
 * 3. Force-Directed Interactive Knowledge Graph Canvas (D3-like Physics)
 * 4. Citizen Persona Filter & Everyday Takeaways
 * 5. Web Audio API High-Tech Sound Synthesizer
 */

// ============================================================================
// 1. WEB AUDIO SYNTHESIZER (Sci-Fi Audio Feedback - Zero external audio files)
// ============================================================================
class TechAudioSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playBeep(freq = 880, type = 'sine', duration = 0.06, vol = 0.05) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playBurst(index = 0) {
    const baseFreq = 520 + (index * 60);
    this.playBeep(baseFreq, 'triangle', 0.08, 0.04);
  }

  playClick() {
    this.playBeep(1200, 'sine', 0.04, 0.03);
  }

  playSuccess() {
    this.playBeep(659.25, 'sine', 0.1, 0.04);
    setTimeout(() => this.playBeep(880, 'sine', 0.15, 0.04), 80);
  }
}

const techAudio = new TechAudioSynth();

// ============================================================================
// 2. HERO PARTICLE CONSTELLATION CANVAS
// ============================================================================
function initHeroConstellation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  const particleCount = 42;
  const mouse = { x: -1000, y: -1000 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1.2;
      this.color = Math.random() > 0.6 ? '#D7FF3A' : (Math.random() > 0.5 ? '#2EE6FF' : '#FF5A1F');
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x -= (dx / dist) * 1.5;
        this.y -= (dy / dist) * 1.5;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#2C2C3A';
          ctx.globalAlpha = (1 - dist / 130) * 0.4;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

// ============================================================================
// 3. HALL 02: GUIDED DATA BOOMING RADIAL ENGINE
// ============================================================================
const boomingDatasets = {
  herbs: {
    title: "แพทย์แผนไทย & นาโนชีวภาพ",
    code: "GRM-1872-MED-014",
    category: "วัฒนธรรม & การแพทย์",
    takeaway: "ใช้ความเข้าใจสมดุลธาตุร่วมกับการแพทย์แม่นยำในการดูแลสุขภาพประจำวัน",
    children: [
      { id: "h1", label: "คัมภีร์เวชศาสตร์ฉบับหลวง", relation: "เอกสารปฐมภูมิ", color: "#FF5A1F", dist: 150, angle: 30, takeaway: "แหล่งอ้างอิงตำรับยาสมุนไพร 400 ชนิด" },
      { id: "h2", label: "สารสกัดเคอร์คูมินอยด์", relation: "ชีวเคมีสมัยใหม่", color: "#2EE6FF", dist: 160, angle: 80, takeaway: "นาโนเอนแคปซูเลชันเพิ่มการดูดซึม 9 เท่า" },
      { id: "h3", label: "สมุนไพรตรีผลา", relation: "ต้านการอักเสบ", color: "#34E89E", dist: 140, angle: 135, takeaway: "สารต้านอนุมูลอิสระจากมะขามป้อม สมอไทย สมอพิเภก" },
      { id: "h4", label: "กายวิภาคฤๅษีดัดตน", relation: "สรีรวิทยาโบราณ", color: "#8C6BFF", dist: 175, angle: 190, takeaway: "18 ท่าพื้นฐานเพื่อแก้อาการออฟฟิศซินโดรม" },
      { id: "h5", label: "ทฤษฎีสมดุลธาตุทั้ง 4", relation: "ปรัชญาการแพทย์", color: "#FFC233", dist: 155, angle: 245, takeaway: "ปรับพฤติกรรมตามสภาพอากาศและเวลาชีวภาพ" },
      { id: "h6", label: "การแพทย์บูรณาการ", relation: "การประยุกต์ใช้", color: "#FF5FA2", dist: 165, angle: 300, takeaway: "ลดการใช้ยาปฏิชีวนะด้วยสารสกัดธรรมชาติ" },
      { id: "h7", label: "Everyday Takeaway", relation: "Actionable Wisdom", color: "#D7FF3A", dist: 180, angle: 350, takeaway: "เริ่มดื่มน้ำขิงอุ่นและบริหารยืดเหยียดเช้า 5 นาที" }
    ]
  },
  architecture: {
    title: "วิศวกรรมสถาปัตย์เรือนไทย",
    code: "GRM-1767-ENG-042",
    category: "เทคโนโลยี & ช่างศิลป์",
    takeaway: "ถอดรหัส Passive Cooling จากเรือนไทยสู่การลดพลังงานในบ้านยุคใหม่",
    children: [
      { id: "a1", label: "การเข้าเดือยไม้ไร้ตะปู", relation: "กลศาสตร์โครงสร้าง", color: "#8C6BFF", dist: 150, angle: 25, takeaway: "ยืดหยุ่นต่อแรงแผ่นดินไหวและถอดประกอบได้" },
      { id: "a2", label: "การระบายลมใต้ถุนสูง", relation: "Passive Aerodynamics", color: "#2EE6FF", dist: 165, angle: 80, takeaway: "ลดความร้อนสะสมในอาคารได้ 3-4 องศา" },
      { id: "a3", label: "องศาหลังคาจั่วแหลม", relation: "พลศาสตร์น้ำฝน", color: "#34E89E", dist: 145, angle: 140, takeaway: "ระบายน้ำฝนมรสุมได้เร็ว ป้องกันน้ำรั่วซึม" },
      { id: "a4", label: "ชายคายื่นยาว 45°", relation: "บังแดดและแสงสะท้อน", color: "#FFC233", dist: 160, angle: 195, takeaway: "ป้องกันความร้อนสัมผัสผนังโดยตรง" },
      { id: "a5", label: "ฝาปะกนแบบถอดได้", relation: "พรีแฟบยุคโบราณ", color: "#FF5A1F", dist: 150, angle: 250, takeaway: "แนวคิด Modular Construction โบราณ" },
      { id: "a6", label: "สถาปัตยกรรมคาร์บอนต่ำ", relation: "ความยั่งยืน", color: "#FF5FA2", dist: 170, angle: 305, takeaway: "เลือกใช้วัสดุท้องถิ่น ย่อยสลายได้ 100%" },
      { id: "a7", label: "Everyday Takeaway", relation: "Actionable Wisdom", color: "#D7FF3A", dist: 180, angle: 355, takeaway: "จัดช่องลมทิศเหนือ-ใต้ และปลูกไม้บังแดดทิศตะวันตก" }
    ]
  },
  silk: {
    title: "เส้นใยไหม & ชีววัสดุแห่งอนาคต",
    code: "GRM-1905-MAT-108",
    category: "วัสดุศาสตร์ & ภูมิปัญญา",
    takeaway: "คุณสมบัติไฟโบรอินและเซริซินของไหมไทย สู่การพัฒนานวัตกรรมชีวการแพทย์",
    children: [
      { id: "s1", label: "โปรตีนไฟโบรอิน (Fibroin)", relation: "โครงสร้างระดับนาโน", color: "#2EE6FF", dist: 155, angle: 30, takeaway: "เข้ากันได้กับเนื้อเยื่อมนุษย์ ใช้ทำไหมเย็บแผล" },
      { id: "s2", label: "สารเคลือบเซริซิน (Sericin)", relation: "ชีวเภสัชภัณฑ์", color: "#FF5A1F", dist: 150, angle: 85, takeaway: "ต้านสารอนุมูลอิสระและกระตุ้นการสร้างคอลลาเจน" },
      { id: "s3", label: "ภูมิปัญญาการสาวไหมมือ", relation: "วิศวกรรมพื้นบ้าน", color: "#8C6BFF", dist: 165, angle: 145, takeaway: "รักษาความสม่ำเสมอของเกลียวเส้นใยตามธรรมชาติ" },
      { id: "s4", label: "สีย้อมจากพืชท้องถิ่น", relation: "เคมีสีเขียว", color: "#34E89E", dist: 140, angle: 200, takeaway: "สีย้อมคราม ครั่ง แกแล ไร้สารพิษตกค้าง" },
      { id: "s5", label: "โครงสร้างนั่งร้านเซลล์", relation: "การแพทย์ฟื้นฟู", color: "#FFC233", dist: 165, angle: 255, takeaway: "ใช้ไฟโบรอินเป็น Scaffold ปลูกถ่ายกระดูกเทียม" },
      { id: "s6", label: "สิ่งทออัจฉริยะ (Smart Tech)", relation: "E-Textiles", color: "#FF5FA2", dist: 155, angle: 310, takeaway: "เส้นใยไหมนำไฟฟ้าสำหรับเซนเซอร์วัดสัญญาณชีพ" },
      { id: "s7", label: "Everyday Takeaway", relation: "Actionable Wisdom", color: "#D7FF3A", dist: 180, angle: 355, takeaway: "สนับสนุนผ้าไหมธรรมชาติย้อมครามเพื่อสิ่งแวดล้อม" }
    ]
  }
};

let currentBoomKey = 'herbs';
let boomLevel = 1;

function initDataBoomingEngine() {
  const container = document.getElementById('booming-svg');
  if (!container) return;

  renderBoomingGraph(currentBoomKey);

  // Hook button selectors
  document.querySelectorAll('.seed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBoomKey = btn.dataset.seed;
      techAudio.playClick();
      renderBoomingGraph(currentBoomKey);
    });
  });

  const resetBtn = document.getElementById('btn-reset-boom');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      techAudio.playClick();
      renderBoomingGraph(currentBoomKey);
    });
  }
}

function renderBoomingGraph(seedKey) {
  const svg = document.getElementById('booming-svg');
  const countEl = document.getElementById('boom-count');
  const statusEl = document.getElementById('boom-status');
  const takeawayText = document.getElementById('boom-takeaway-text');
  if (!svg) return;

  const data = boomingDatasets[seedKey];
  svg.innerHTML = '';
  if (countEl) countEl.innerText = '0 NODES';
  if (statusEl) statusEl.innerHTML = `<span style="color: var(--gr-lime);">[BURSTING: ${data.code}]</span>`;
  if (takeawayText) takeawayText.innerText = data.takeaway;

  const rect = svg.getBoundingClientRect();
  const cx = rect.width ? rect.width / 2 : 360;
  const cy = rect.height ? rect.height / 2 : 260;

  // 1. Radar Sweep Rings
  const radarRing = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  radarRing.setAttribute("cx", cx);
  radarRing.setAttribute("cy", cy);
  radarRing.setAttribute("r", "20");
  radarRing.setAttribute("fill", "none");
  radarRing.setAttribute("stroke", "#D7FF3A");
  radarRing.setAttribute("stroke-width", "2");
  radarRing.setAttribute("opacity", "0.9");
  radarRing.style.transition = "all 0.6s var(--ease-tech)";
  svg.appendChild(radarRing);

  setTimeout(() => {
    radarRing.setAttribute("r", "190");
    radarRing.setAttribute("opacity", "0");
  }, 40);

  // 2. Center Seed Node
  const centerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
  centerG.setAttribute("transform", `translate(${cx}, ${cy})`);
  centerG.innerHTML = `
    <circle r="34" fill="#D7FF3A" opacity="0.15" filter="drop-shadow(0 0 20px #D7FF3A)"></circle>
    <circle r="26" fill="#17171F" stroke="#D7FF3A" stroke-width="2.5"></circle>
    <circle r="12" fill="#D7FF3A"></circle>
    <text y="46" text-anchor="middle" fill="#F2EDE3" font-family="'Chakra Petch', sans-serif" font-weight="700" font-size="13">${data.title}</text>
    <text y="62" text-anchor="middle" fill="#8A8A9E" font-family="'IBM Plex Mono', monospace" font-size="10">${data.code}</text>
  `;
  svg.appendChild(centerG);

  // 3. Staggered Radial Child Nodes (40ms interval rule)
  data.children.forEach((child, index) => {
    setTimeout(() => {
      techAudio.playBurst(index);

      const rad = (child.angle * Math.PI) / 180;
      const tx = cx + Math.cos(rad) * child.dist;
      const ty = cy + Math.sin(rad) * child.dist;

      // Draw connecting line
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", tx);
      line.setAttribute("y2", ty);
      line.setAttribute("stroke", child.color);
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("stroke-dasharray", "4,4");
      line.setAttribute("opacity", "0.65");
      svg.insertBefore(line, centerG);

      // Draw Child Node
      const nodeG = document.createElementNS("http://www.w3.org/2000/svg", "g");
      nodeG.setAttribute("transform", `translate(${tx}, ${ty})`);
      nodeG.style.cursor = "pointer";
      nodeG.innerHTML = `
        <circle r="18" fill="${child.color}" opacity="0.18"></circle>
        <circle r="9" fill="${child.color}" filter="drop-shadow(0 0 8px ${child.color})"></circle>
        <rect x="-60" y="-24" width="120" height="18" rx="2" fill="rgba(11,11,15,0.85)" stroke="#2C2C3A" stroke-width="1"></rect>
        <text y="-12" text-anchor="middle" fill="${child.color}" font-family="'IBM Plex Mono', monospace" font-size="9" font-weight="600">${child.relation}</text>
        <text y="24" text-anchor="middle" fill="#F2EDE3" font-family="'IBM Plex Sans Thai', sans-serif" font-size="11.5" font-weight="500">${child.label}</text>
      `;

      // Interactive drilldown on child click
      nodeG.addEventListener('click', () => {
        techAudio.playClick();
        if (takeawayText) {
          takeawayText.innerHTML = `<strong>${child.label}:</strong> ${child.takeaway}`;
        }
        if (statusEl) {
          statusEl.innerHTML = `<span style="color: ${child.color};">[EXPLORING: ${child.label}]</span>`;
        }
      });

      svg.appendChild(nodeG);

      if (countEl) countEl.innerText = `${index + 1} / ${data.children.length} NODES`;

      if (index === data.children.length - 1) {
        techAudio.playSuccess();
        if (statusEl) {
          statusEl.innerHTML = `<span style="color: var(--gr-green);">[ACTIVE: 3-SECOND COMPREHENSION ACHIEVED]</span>`;
        }
      }
    }, (index + 1) * 50);
  });
}

// ============================================================================
// 4. HALL 03: INTERACTIVE KNOWLEDGE GRAPH CANVAS (PHYSICS ENGINE)
// ============================================================================
const kgKnowledgeNodes = [
  // Science & Medicine (Cyan)
  { id: "sci-1", name: "ตำรับยาไทยโบราณ", category: "sci", era: "อยุธยา", year: 1680, x: 220, y: 180, r: 18, color: "#2EE6FF", desc: "การรวมสมุนไพรพื้นถิ่น 400 ชนิดและการเทียบสัดส่วนตามทฤษฎีตรีผลา", takeaway: "เข้าใจสมดุลอาหารและการใช้ขมิ้นชันเป็นประจำ" },
  { id: "sci-2", name: "นาโนชีวเคมี", category: "sci", era: "ดิจิทัล", year: 2024, x: 180, y: 110, r: 16, color: "#2EE6FF", desc: "การสกัดสารออกฤทธิ์ทางชีวภาพเพื่อเพิ่มการดูดซึมในร่างกาย", takeaway: "นวัตกรรมอาหารเสริมและเวชสำอางไทยสู่สากล" },
  { id: "sci-3", name: "ดาราศาสตร์สุโขทัย", category: "sci", era: "สุโขทัย", year: 1345, x: 310, y: 140, r: 14, color: "#2EE6FF", desc: "การคำนวณตำแหน่งดวงอาทิตย์และฤดูกาลจากคัมภีร์ไตรภูมิ", takeaway: "การวางปฏิทินกสิกรรมตามสภาพภูมิอากาศจริง" },

  // History & Archaeology (Ember)
  { id: "his-1", name: "ศิลาจารึกหลักที่ 1", category: "his", era: "สุโขทัย", year: 1292, x: 380, y: 220, r: 20, color: "#FF5A1F", desc: "บันทึกเศรษฐกิจ การค้าเสรี และภาษาไทยยุคแรกเริ่ม", takeaway: "รากฐานสิทธิและเสรีภาพในการประกอบอาชีพของสังคมไทย" },
  { id: "his-2", name: "เครือข่ายการค้าอยุธยา", category: "his", era: "อยุธยา", year: 1590, x: 450, y: 290, r: 22, color: "#FF5A1F", desc: "ศูนย์กลางการค้านานาชาติเชื่อมโยงตะวันออกและตะวันตก", takeaway: "การทูตและโลจิสติกส์การค้าข้ามวัฒนธรรม" },
  { id: "his-3", name: "จดหมายเหตุรัตนโกสินทร์", category: "his", era: "รัตนโกสินทร์", year: 1868, x: 520, y: 240, r: 16, color: "#FF5A1F", desc: "การปฏิรูปสู่ความทันสมัยในรัชกาลที่ 4 และ 5", takeaway: "การปรับตัวเข้าสู่มาตรฐานสากลโดยไม่สูญเสียอัตลักษณ์" },

  // Technology & Engineering (Violet)
  { id: "tech-1", name: "วิศวกรรมเข้าเดือยไม้", category: "tech", era: "อยุธยา", year: 1650, x: 300, y: 340, r: 18, color: "#8C6BFF", desc: "โครงสร้างเรือนไทยไร้ตะปู ทนทานต่อการขยายตัวของสภาพอากาศ", takeaway: "แนวคิด Modular Architecture และ Circular Construction" },
  { id: "tech-2", name: "กี่กระตุกทอผ้าไหม", category: "tech", era: "รัตนโกสินทร์", year: 1910, x: 230, y: 410, r: 15, color: "#8C6BFF", desc: "กลไกทุ่นแรงที่เร่งความเร็วในการทอผ้าถึงสามเท่า", takeaway: "เทคโนโลยีระดับกลางที่เพิ่มผลผลิตให้ชุมชน" },
  { id: "tech-3", name: "Knowledge Graph ปัญญาประดิษฐ์", category: "tech", era: "อนาคต", year: 2026, x: 160, y: 310, r: 24, color: "#8C6BFF", desc: "การเชื่อมโยงข้อมูลแบบเครือข่ายเซแมนติก รองรับ Sovereign AI", takeaway: "การคิดเชิงระบบ (Systems Thinking) ในยุคดิจิทัล" },

  // Culture & Wisdom (Amber)
  { id: "cul-1", name: "ลวดลายประจำยาม", category: "cul", era: "สุโขทัย", year: 1300, x: 420, y: 430, r: 17, color: "#FFC233", desc: "ลายไทยเรขาคณิตสี่กลีบ สะท้อนสมมาตรและความสงบ", takeaway: "การจัดองค์ประกอบภาพและสัดส่วนทองคำในศิลปะไทย" },
  { id: "cul-2", name: "ประเพณีลงแขกเกี่ยวข้าว", category: "cul", era: "อยุธยา", year: 1700, x: 500, y: 380, r: 15, color: "#FFC233", desc: "เศรษฐกิจแบบร่วมมือและทุนทางสังคมที่ไม่ใช้เงินตรา", takeaway: "Co-working และ Collaborative Intelligence ยุคใหม่" },

  // Nature & Life (Bio Green)
  { id: "bio-1", name: "ความหลากหลายทางชีวภาพข้าวไทย", category: "bio", era: "สุโขทัย", year: 1350, x: 580, y: 320, r: 18, color: "#34E89E", desc: "สายพันธุ์ข้าวกว่า 5,000 ชนิดที่ปรับตัวตามระบบนิเวศน้ำหลาก", takeaway: "ความมั่นคงทางอาหารและการบริโภคคาร์โบไฮเดรตเชิงซ้อน" },
  { id: "bio-2", name: "วนเกษตรดั้งเดิม", category: "bio", era: "รัตนโกสินทร์", year: 1900, x: 620, y: 220, r: 16, color: "#34E89E", desc: "การปลูกพืช 7 ระดับเลียนแบบป่าธรรมชาติ ไม่พึ่งสารเคมี", takeaway: "Permaculture และการปลูกพืชในพื้นที่จำกัด" },

  // Art & Design (Coral)
  { id: "art-1", name: "จิตรกรรมฝาผนังวัดพระแก้ว", category: "art", era: "รัตนโกสินทร์", year: 1782, x: 380, y: 130, r: 19, color: "#FF5FA2", desc: "มหากาพย์รามเกียรติ์ที่บันทึกวิถีชีวิต ช่างสิบหมู่ และสถาปัตยกรรม", takeaway: "Visual Storytelling และ Character Design สำหรับแบรนด์" }
];

const kgKnowledgeEdges = [
  { source: "sci-1", target: "sci-2", relation: "derived_from" },
  { source: "sci-1", target: "his-2", relation: "traded_in" },
  { source: "his-1", target: "sci-3", relation: "recorded_in" },
  { source: "tech-1", target: "his-2", relation: "built_for" },
  { source: "tech-1", target: "tech-3", relation: "influenced" },
  { source: "tech-3", target: "sci-2", relation: "analyzes" },
  { source: "cul-1", target: "art-1", relation: "manifests_in" },
  { source: "bio-1", target: "cul-2", relation: "powers" },
  { source: "bio-2", target: "sci-1", relation: "supplies" },
  { source: "art-1", target: "his-3", relation: "preserved_by" },
  { source: "tech-2", target: "cul-1", relation: "embodies" }
];

function initInteractiveGraphCanvas() {
  const canvas = document.getElementById('kg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let transform = { x: 0, y: 0, k: 1 };
  let isDragging = false;
  let dragNode = null;
  let hoveredNode = null;
  let lastMouse = { x: 0, y: 0 };
  let activeCategories = new Set(['sci', 'his', 'tech', 'cul', 'bio', 'art']);

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Simple Physics Force Simulation
  function simulateForces() {
    kgKnowledgeNodes.forEach((node, i) => {
      // Repulsion between nodes
      for (let j = i + 1; j < kgKnowledgeNodes.length; j++) {
        const other = kgKnowledgeNodes[j];
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 180) {
          const force = (180 - dist) / 180 * 0.15;
          node.x -= (dx / dist) * force;
          node.y -= (dy / dist) * force;
          other.x += (dx / dist) * force;
          other.y += (dy / dist) * force;
        }
      }

      // Attract connected nodes
      kgKnowledgeEdges.forEach(edge => {
        const src = kgKnowledgeNodes.find(n => n.id === edge.source);
        const tgt = kgKnowledgeNodes.find(n => n.id === edge.target);
        if (src && tgt) {
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - 140) * 0.005;
          src.x += (dx / dist) * force;
          src.y += (dy / dist) * force;
          tgt.x -= (dx / dist) * force;
          tgt.y -= (dy / dist) * force;
        }
      });

      // Keep within bounds
      node.x = Math.max(60, Math.min(width - 60, node.x));
      node.y = Math.max(60, Math.min(height - 60, node.y));
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    simulateForces();

    // Draw links
    kgKnowledgeEdges.forEach(edge => {
      const src = kgKnowledgeNodes.find(n => n.id === edge.source);
      const tgt = kgKnowledgeNodes.find(n => n.id === edge.target);
      if (!src || !tgt) return;
      if (!activeCategories.has(src.category) || !activeCategories.has(tgt.category)) return;

      const isHighlight = (hoveredNode && (hoveredNode.id === src.id || hoveredNode.id === tgt.id));

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);
      ctx.strokeStyle = isHighlight ? '#D7FF3A' : '#2C2C3A';
      ctx.lineWidth = isHighlight ? 2 : 1;
      ctx.setLineDash(isHighlight ? [] : [4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw nodes
    kgKnowledgeNodes.forEach(node => {
      if (!activeCategories.has(node.category)) return;

      const isHovered = (hoveredNode && hoveredNode.id === node.id);

      // Outer glow
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 10, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.25;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Base Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#D7FF3A' : node.color;
      ctx.fill();

      // Inner Dark Core
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = '#0B0B0F';
      ctx.fill();

      // Label text
      ctx.font = isHovered ? "bold 13px 'Chakra Petch'" : "11.5px 'IBM Plex Sans Thai'";
      ctx.fillStyle = isHovered ? '#D7FF3A' : '#F2EDE3';
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + node.r + 16);
    });

    requestAnimationFrame(draw);
  }

  // Mouse interaction
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDragging && dragNode) {
      dragNode.x = mx;
      dragNode.y = my;
      return;
    }

    hoveredNode = null;
    for (let node of kgKnowledgeNodes) {
      if (!activeCategories.has(node.category)) continue;
      const dx = mx - node.x;
      const dy = my - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < node.r + 5) {
        hoveredNode = node;
        canvas.style.cursor = 'pointer';
        break;
      }
    }
    if (!hoveredNode) {
      canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
    }
  });

  canvas.addEventListener('mousedown', (e) => {
    if (hoveredNode) {
      dragNode = hoveredNode;
      isDragging = true;
      openNodeInspector(dragNode);
      techAudio.playClick();
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    dragNode = null;
  });

  // Filter Buttons
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      if (activeCategories.has(cat)) {
        activeCategories.delete(cat);
        btn.classList.remove('active');
      } else {
        activeCategories.add(cat);
        btn.classList.add('active');
      }
      techAudio.playClick();
    });
  });

  draw();
}

function openNodeInspector(node) {
  const inspector = document.getElementById('kg-inspector');
  if (!inspector) return;

  document.getElementById('inspect-code').innerText = `GRM-${node.year}-${node.category.toUpperCase()}-0${node.id.slice(-1)}`;
  document.getElementById('inspect-name').innerText = node.name;
  document.getElementById('inspect-era').innerText = `${node.era} (พ.ศ. ${node.year})`;
  document.getElementById('inspect-desc').innerText = node.desc;
  document.getElementById('inspect-takeaway').innerText = node.takeaway;

  inspector.classList.add('open');
}

function closeNodeInspector() {
  const inspector = document.getElementById('kg-inspector');
  if (inspector) inspector.classList.remove('open');
}

// ============================================================================
// 5. HALL 04: EVERYDAY LAB PERSONA FILTERS
// ============================================================================
function initEverydayLab() {
  const pills = document.querySelectorAll('.persona-pill');
  const cards = document.querySelectorAll('.takeaway-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      techAudio.playClick();

      const persona = pill.dataset.persona;
      cards.forEach(card => {
        if (persona === 'all' || card.dataset.persona === persona) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================================================
// 6. MODALS & GLOBAL UTILITIES
// ============================================================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    techAudio.playClick();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

// Sound toggle
function toggleSound() {
  techAudio.enabled = !techAudio.enabled;
  const btn = document.getElementById('sound-toggle');
  if (btn) {
    btn.innerText = techAudio.enabled ? '[SFX: ON]' : '[SFX: OFF]';
    btn.style.color = techAudio.enabled ? 'var(--gr-lime)' : 'var(--gr-fog)';
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initHeroConstellation();
  initDataBoomingEngine();
  initInteractiveGraphCanvas();
  initEverydayLab();

  // Close inspector on outside click
  const closeBtn = document.getElementById('btn-close-inspector');
  if (closeBtn) closeBtn.addEventListener('click', closeNodeInspector);

  // Esc key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      closeNodeInspector();
    }
  });
});
