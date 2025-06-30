let w;
let dx;
let yvalues; // 繧ｳ繝｡繝ｳ繝医い繧ｦ繝医ｒ隗｣髯､
let ydev;
let ydev_m = 300;
let nw0, nw;
let ansJudge = 0;
let section = 0;
let i = 0;

// 蝗ｺ螳壹ヱ繝ｩ繝｡繝ｼ繧ｿ
let theta = 120;
let amplitude = 32;
let moveX = 1;
let xSpacing = 32; // 16, 32, 48
let long = 350; // 223, 350, 448
let period = 250; // 224, 250, 288
// 螳滄ｨ薙〒謫堺ｽ懊☆繧九ヱ繝ｩ繝｡繝ｼ繧ｿ
let positionsync = 0; // n*32 (0, 32, 64, 96)

function setup() {
    // Canvas繧剃ｽ懈�縺励∝､画焚縺ｫ譬ｼ邏�
    let canvas = createCanvas(800, 400);

    // jsPsych荳翫�陦ｨ遉ｺ鬆伜沺縺ｮ隱ｿ謨ｴ
    // Canvas繧剃ｸｭ螟ｮ荳企Κ縺ｫ驟咲ｽｮ
    canvas.style('display', 'block');  // 繝悶Ο繝�け繝ｬ繝吶Ν隕∫ｴ�縺ｨ縺励※險ｭ螳�
    canvas.style('margin', 'auto');    // 閾ｪ蜍輔�繝ｼ繧ｸ繝ｳ縺ｧ豌ｴ蟷ｳ荳ｭ螟ｮ謠�∴
    canvas.style('margin-top', '-70px'); // 荳企Κ縺ｮ繝槭�繧ｸ繝ｳ繧呈欠螳�

    // 隕ｪ隕∫ｴ�縺悟ｭ伜惠縺吶ｋ縺狗｢ｺ隱阪＠縲∝ｭ伜惠縺励↑縺��ｴ蜷医�菴懈�
    let parentElement = document.getElementById('p5-canvas');
    if (!parentElement) {
        parentElement = document.createElement('div');
        parentElement.id = 'p5-canvas';
        document.body.appendChild(parentElement);
    }

    // 隕∫ｴ�繧鍛ody繧ｿ繧ｰ縺ｮ蟄占ｦ∫ｴ�縺ｨ縺励※驟咲ｽｮ
    canvas.parent(parentElement);

    // P5js縺ｮ險ｭ螳�
    nw0 = millis();
    w = long;
    yvalues = new Array(floor(w / xSpacing));
    //console.log(jsPsych.timelineVariable("shape"));
    switch (jsPsych.timelineVariable("noise")) {
        case 0:
            positionsync = 0; // n*32 (0, 32, 64, 96);
            break;
        case 1:
            positionsync = 48;
            break;
        case 2:
            positionsync = 96;
            break;
        case 3:
            positionsync = 144;
            break;
    }
    calcLong();
    calcRand();
}

function draw() {
    background(128);
    nw = millis() - nw0;
    calcWave();
    renderWave();
    renderLineWave();
}

function calcLong() {
    w = long;
}

function calcRand() {
    ydev = new Array(floor(w / xSpacing));
    for (let x = 0; x < ydev.length; x++) {
        ydev[x] = random() * positionsync - positionsync / 2;
    }
}

function calcWave() {
    theta = PI * nw / 1000 * 2;
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude + ydev[i];
        x += (TWO_PI / period) * xSpacing;
    }
}

function renderWave() {
    noStroke();
    fill(0);
    let xoffset = (width - xSpacing * (yvalues.length - 1)) / 2;
    for (let x = 0; x < yvalues.length; x++) {
        ellipse(x * xSpacing + xoffset, height / 2 + yvalues[x], 16, 16);
    }
}

function renderLineWave() {
    fill(0);
    let xoffset = (width - xSpacing * (yvalues.length - 1)) / 2;
    stroke(0);
    strokeWeight(2);
    for (let x = 0; x < yvalues.length - 1; x++) { // 遽�峇螟悶い繧ｯ繧ｻ繧ｹ繧帝亟縺舌◆繧� - 1
        line(x * xSpacing + xoffset, height / 2 + yvalues[x], (x + 1) * xSpacing + xoffset, height / 2 + yvalues[x + 1]);
    }
}
