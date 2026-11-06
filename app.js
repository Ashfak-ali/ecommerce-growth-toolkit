const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// 1. ROAS Calculator
function calcROAS() {
  const spend = parseFloat(document.getElementById('roas-spend').value) || 0;
  const mult = parseFloat(document.getElementById('roas-mult').value) || 0;
  const rev = spend * mult;
  const net = rev - spend;
  document.getElementById('roas-rev').innerText = USD.format(rev);
  document.getElementById('roas-profit').innerText = `Estimated Net: +${USD.format(net)}`;
}

// 2. Break-Even ROAS Target
function calcBreakEven() {
  const price = parseFloat(document.getElementById('be-price').value) || 0;
  const cogs = parseFloat(document.getElementById('be-cogs').value) || 0;
  const margin = price - cogs;
  let beRoas = 0;
  let marginPct = 0;
  if (margin > 0 && price > 0) {
    beRoas = price / margin;
    marginPct = (margin / price) * 100;
  }
  document.getElementById('be-roas').innerText = `${beRoas.toFixed(2)}x`;
  document.getElementById('be-margin').innerText = `Gross Margin: ${marginPct.toFixed(1)}%`;
}

// 3. CRO Uplift Engine
function calcCRO() {
  const traffic = parseFloat(document.getElementById('cro-traffic').value) || 0;
  const cur = parseFloat(document.getElementById('cro-cur').value) || 0;
  const target = parseFloat(document.getElementById('cro-target').value) || 0;
  const aov = parseFloat(document.getElementById('cro-aov').value) || 0;
  
  const curRev = traffic * (cur / 100) * aov;
  const targetRev = traffic * (target / 100) * aov;
  const extra = Math.max(0, targetRev - curRev);
  
  document.getElementById('cro-extra').innerText = `+${USD.format(extra)}`;
  document.getElementById('cro-total').innerText = `New Monthly Gross: ${USD.format(targetRev)}`;
}

// 4. Inventory Reorder Point (ROP)
function calcROP() {
  const daily = parseFloat(document.getElementById('rop-daily').value) || 0;
  const lead = parseFloat(document.getElementById('rop-lead').value) || 0;
  const buffer = parseFloat(document.getElementById('rop-buffer').value) || 0;
  
  const leadDemand = daily * lead;
  const safetyStock = daily * buffer;
  const rop = leadDemand + safetyStock;
  
  document.getElementById('rop-val').innerText = `${Math.round(rop).toLocaleString()} Units`;
}

// 5. SKU Generator
function genSKU() {
  const b = (document.getElementById('sku-brand').value || 'BRAND').trim().toUpperCase().replace(/\s+/g, '');
  const c = (document.getElementById('sku-cat').value || 'CAT').trim().toUpperCase().replace(/\s+/g, '');
  const cl = (document.getElementById('sku-color').value || 'CLR').trim().toUpperCase().replace(/\s+/g, '');
  const s = (document.getElementById('sku-size').value || 'SZ').trim().toUpperCase().replace(/\s+/g, '');
  document.getElementById('sku-val').innerText = `${b}-${c}-${cl}-${s}-01`;
}

function copySKU() {
  const text = document.getElementById('sku-val').innerText;
  navigator.clipboard.writeText(text);
  alert('SKU copied to clipboard: ' + text);
}

// 6. CLV Calculator
function calcCLV() {
  const aov = parseFloat(document.getElementById('clv-aov').value) || 0;
  const freq = parseFloat(document.getElementById('clv-freq').value) || 0;
  const life = parseFloat(document.getElementById('clv-life').value) || 0;
  const ltv = aov * freq * life;
  document.getElementById('clv-val').innerText = USD.format(ltv);
}

calcROAS();
calcBreakEven();
calcCRO();
calcROP();
genSKU();
calcCLV();
