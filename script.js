// 초기 값 설정
let fontFamily = "\\rm"; // 기본 Serif
let fontStyle = ""; // 기본 Normal
let fontSize = "\\tiny"; // 기본 크기 (아주 작게)
let textColor = "#000000";
let bgColor = "#FFFFFF";

// 페이지 로드 시 초기화
window.onload = function () {
    const preview = document.getElementById('preview');
    preview.innerText = ""; // 미리보기 초기 상태를 빈 값으로 설정
};

function updatePreview() {
   const text = document.getElementById('textInput').value; // 변경할 내용 입력값

   // 미리보기 영역 업데이트
   const preview = document.getElementById('preview');
   preview.style.color = textColor; // 글자 색상
   preview.style.backgroundColor = bgColor; // 배경 색상
   preview.style.fontFamily = fontFamily === "\\sf" ? "Arial, sans-serif" : 
                              fontFamily === "\\tt" ? "Courier New, monospace" : 
                              "Times New Roman, serif"; // 글꼴 매핑

   // 글자 스타일 반영
   preview.style.fontStyle = fontStyle.includes("\\textit") ? "italic" : "normal";
   preview.style.fontWeight = fontStyle.includes("\\textbf") ? "bold" : "normal";

   // 글자 크기 반영 (LaTeX 크기를 CSS 크기로 매핑)
   switch (fontSize) {
       case "\\tiny":
           preview.style.fontSize = "10px";
           break;
       case "\\small":
           preview.style.fontSize = "12px";
           break;
       case "\\normalsize":
           preview.style.fontSize = "16px";
           break;
       case "\\large":
           preview.style.fontSize = "20px";
           break;
       case "\\Huge":
           preview.style.fontSize = "32px";
           break;
       default:
           preview.style.fontSize = "16px"; // 기본값
   }

   // 미리보기 텍스트 업데이트
   preview.innerText = text || ""; // 입력값이 없으면 빈 상태 유지

   // LaTeX 결과값 생성
   let latexStyle = `${fontSize} ${fontFamily} `;
  
   if (bgColor !== "#FFFFFF") {
       latexStyle += `\\colorbox{${bgColor}}{`;
   }

   latexStyle += `\\color{${textColor}}{`;

   if (fontStyle.includes("\\textbf")) latexStyle += "\\textbf{";
   if (fontStyle.includes("\\textit")) latexStyle += "\\textit{";

   latexStyle += text;

   if (fontStyle.includes("\\textit")) latexStyle += "}";
   if (fontStyle.includes("\\textbf")) latexStyle += "}";

   latexStyle += "}";

   if (bgColor !== "#FFFFFF") latexStyle += "}";

   document.getElementById('resultEquation').value = latexStyle; // 결과값 반영
}

// 이벤트 리스너 추가
document.getElementById('textInput').addEventListener('input', updatePreview);

document.getElementById('textColorPicker').addEventListener('input', (e) => {
   textColor = e.target.value; 
   updatePreview();
});

document.getElementById('bgColorPicker').addEventListener('input', (e) => {
   bgColor = e.target.value; 
   updatePreview();
});

document.getElementById('fontSelect').addEventListener('change', (e) => {
   fontFamily = e.target.value; 
   updatePreview();
});

document.getElementById('fontStyleSelect').addEventListener('change', (e) => {
   fontStyle = e.target.value; 
   updatePreview();
});

document.getElementById('fontSizeSelect').addEventListener('change', (e) => {
   fontSize = e.target.value; 
   updatePreview();
});

// 복사 기능 구현
function copyToClipboard() {
    const equation = document.getElementById('resultEquation');
    equation.select();
    document.execCommand('copy');
}
