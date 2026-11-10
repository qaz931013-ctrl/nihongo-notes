'use strict';
const DATA_URL = 'data/lessons.json';
const categories = ['全部','文字','單字','文法','會話'];
const symbols = {'文字':'あ','單字':'言','文法':'文','會話':'話'};
let lessons = [];
let activeCategory = '全部';
const $ = (selector) => document.querySelector(selector);
function element(tag, className, value) { const node = document.createElement(tag); if(className) node.className=className; if(value!==undefined) node.textContent=value; return node; }
function renderFilters() {
 const parent=$('#filters'); parent.replaceChildren();
 categories.forEach(category=>{const button=element('button','filter',category);button.type='button';button.setAttribute('aria-pressed',String(category===activeCategory));button.addEventListener('click',()=>{activeCategory=category;renderFilters();renderCards();});parent.append(button);});
}
function renderCards(){
 const query=$('#search').value.trim().toLocaleLowerCase();
 const filtered=lessons.filter(item=>(activeCategory==='全部'||item.category===activeCategory)&&[item.title,item.summary,item.category,item.level,...item.tags,...item.vocab.flatMap(v=>[v.jp,v.reading,v.zh])].join(' ').toLocaleLowerCase().includes(query));
 const cards=$('#cards');cards.replaceChildren();$('#empty').hidden=filtered.length!==0;
 filtered.forEach(item=>{
  const card=element('article','lesson-card'); const visual=element('div','card-visual');visual.append(element('strong','',symbols[item.category]||'日'),element('span','',item.level));
  const body=element('div','card-body');body.append(element('span','meta',`${item.category} · ${item.minutes} 分鐘閱讀`),element('h3','',item.title),element('p','',item.summary));
  const button=element('button','open-lesson','閱讀筆記 ↗');button.type='button';button.addEventListener('click',()=>openLesson(item));body.append(button);card.append(visual,body);cards.append(card);
 });
}
function openLesson(item){
 const container=$('#dialogContent');container.replaceChildren();const inner=element('div','dialog-inner');const top=element('div','dialog-top');const label=element('span','eyebrow',`${item.category.toUpperCase()} · ${item.level} · ${item.minutes} MIN`);const close=element('button','close','×');close.type='button';close.setAttribute('aria-label','關閉筆記');close.addEventListener('click',()=>$('#lessonDialog').close());top.append(label,close);inner.append(top);
 const title=element('h2','',item.title);title.id='dialogTitle';inner.append(title,element('p','intro',item.summary));
 item.sections.forEach(section=>{const wrap=element('section','lesson-section');wrap.append(element('h3','',section.heading),element('p','',section.body));inner.append(wrap);});
 const vocab=element('section','lesson-section');vocab.append(element('h3','','翻面單字卡'));const grid=element('div','vocab-grid');
 item.vocab.forEach(word=>{let flipped=false;const button=element('button','vocab-card');button.type='button';button.setAttribute('aria-label',`${word.jp}，點擊查看中文`);function draw(){button.replaceChildren();if(flipped){button.append(element('span','back',word.zh),element('small','','點擊返回日文'));}else{button.append(element('strong','',word.jp),element('small','',word.reading),element('small','','點擊查看中文'));}}button.addEventListener('click',()=>{flipped=!flipped;draw();});draw();grid.append(button);});vocab.append(grid);inner.append(vocab);
 const quiz=element('section','lesson-section');quiz.append(element('h3','','學習小測驗'),element('p','',item.quiz.question));const options=element('div','quiz-options');const feedback=element('p','feedback');feedback.setAttribute('role','status');item.quiz.options.forEach((option,index)=>{const button=element('button','quiz-option',`${index+1}. ${option}`);button.type='button';button.addEventListener('click',()=>{options.querySelectorAll('button').forEach((node,i)=>{node.disabled=true;if(i===item.quiz.answer)node.classList.add('correct');if(i===index&&index!==item.quiz.answer)node.classList.add('wrong');});feedback.textContent=(index===item.quiz.answer?'答對了！ ':'再記住這個重點： ')+item.quiz.explanation;});options.append(button);});quiz.append(options,feedback);inner.append(quiz,element('div','dialog-footer','✿ 一天學一點，慢慢累積就很棒。'));container.append(inner);$('#lessonDialog').showModal();
}
$('#search').addEventListener('input',renderCards);
$('#lessonDialog').addEventListener('click',event=>{if(event.target===$('#lessonDialog'))$('#lessonDialog').close();});
async function init(){renderFilters();try{const response=await fetch(DATA_URL);if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json();if(!Array.isArray(data))throw new Error('資料格式錯誤');lessons=data;renderCards();}catch(error){$('#empty').hidden=false;$('#empty').textContent='筆記載入失敗。請使用本機伺服器或 GitHub Pages 開啟網站，並確認 data/lessons.json 存在。';console.error('Unable to load lessons:',error);}}
init();
