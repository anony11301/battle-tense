/* Bank soal Simple Present.
   d = tingkat kesulitan (e=mudah 5%, m=sedang 10%, h=sulit 20%)
   o = pilihan jawaban, ISI PERTAMA SELALU JAWABAN BENAR (urutan diacak otomatis di app.js)
   ex = penjelasan singkat yang tampil setelah soal dijawab */
var QS=[
/* MUDAH (5%) */
{d:'e',q:'She ___ to school every day.',o:['goes','go','going','gone'],ex:'Subjek she (orang ketiga tunggal) memakai verb + s/es. Go berubah menjadi goes.'},
{d:'e',q:'I ___ a student.',o:['am','is','are','be'],ex:'Subjek I selalu berpasangan dengan am.'},
{d:'e',q:'They ___ football every Sunday.',o:['play','plays','playing','is play'],ex:'They adalah jamak, jadi verb tidak diberi s.'},
{d:'e',q:'He ___ my brother.',o:['is','am','are','be'],ex:'He, she, it memakai is.'},
{d:'e',q:'The sun ___ in the east.',o:['rises','rise','rising','rised'],ex:'The sun adalah tunggal (it), jadi verb + s. Ini juga fakta umum.'},
{d:'e',q:'We ___ happy today.',o:['are','is','am','be'],ex:'We, you, they memakai are.'},
{d:'e',q:'My mother ___ breakfast every morning.',o:['cooks','cook','cooking','cookes'],ex:'My mother = she, jadi cook + s.'},
{d:'e',q:'Cats ___ milk.',o:['like','likes','liking','is like'],ex:'Cats jamak, verb tanpa s.'},
{d:'e',q:'It ___ a big dog.',o:['is','are','am','be'],ex:'It memakai is.'},
{d:'e',q:'You ___ my best friend.',o:['are','is','am','be'],ex:'You selalu memakai are.'},
{d:'e',q:'Birds ___ in the sky.',o:['fly','flies','flying','is fly'],ex:'Birds jamak, jadi fly tanpa perubahan.'},
{d:'e',q:'The students ___ in the classroom.',o:['are','is','am','be'],ex:'The students = they, memakai are.'},
{d:'e',q:'I ___ milk every morning.',o:['drink','drinks','drinking','am drink'],ex:'Subjek I memakai verb dasar tanpa s.'},
{d:'e',q:'She ___ a teacher.',o:['is','are','am','be'],ex:'She memakai is.'},
/* SEDANG (10%) */
{d:'m',q:'Tom ___ English on Monday.',o:['studies','studys','study','studying'],ex:'Verb berakhiran konsonan + y: ubah y menjadi ies (study menjadi studies).'},
{d:'m',q:'My father ___ TV every night.',o:['watches','watchs','watch','watching'],ex:'Verb berakhiran -ch, -sh, -s, -x, -o ditambah es.'},
{d:'m',q:'Which sentence is correct?',o:['She doesn\'t like fish.','She don\'t like fish.','She doesn\'t likes fish.','She not like fish.'],ex:'Setelah doesn\'t, verb kembali ke bentuk dasar (like, tanpa s).'},
{d:'m',q:'___ you play badminton after school?',o:['Do','Does','Are','Is'],ex:'Kalimat tanya dengan you memakai Do.'},
{d:'m',q:'___ he live in Jakarta?',o:['Does','Do','Is','Are'],ex:'Kalimat tanya dengan he, she, it memakai Does.'},
{d:'m',q:'The train ___ at six o\'clock every morning.',o:['leaves','leave','leaving','is leave'],ex:'The train = it, jadi leave + s. Jadwal tetap memakai simple present.'},
{d:'m',q:'They ___ not at home now.',o:['are','is','do','does'],ex:'Bentuk negatif be: are not. Do/does dipakai untuk verb, bukan be.'},
{d:'m',q:'Mrs. Rina is a nurse. She ___ in a hospital.',o:['works','work','working','is work'],ex:'She memakai verb + s.'},
{d:'m',q:'My sister ___ her teeth twice a day.',o:['brushes','brush','brushs','brushing'],ex:'Brush berakhiran -sh, jadi ditambah es.'},
{d:'m',q:'Water ___ at 100 degrees Celsius.',o:['boils','boil','boiling','is boil'],ex:'Fakta ilmiah memakai simple present. Water = it, jadi boil + s.'},
{d:'m',q:'I ___ not like spicy food.',o:['do','does','am','is'],ex:'Negatif dengan I memakai do not (don\'t).'},
{d:'m',q:'What time ___ your mother get up?',o:['does','do','is','are'],ex:'Your mother = she, jadi memakai does.'},
{d:'m',q:'Rina and Dinda ___ in the same class.',o:['are','is','am','does'],ex:'Rina and Dinda = they (dua orang), memakai are.'},
{d:'m',q:'He ___ his homework in the evening.',o:['does','do','doing','dos'],ex:'Do + he menjadi does (kata kerja utama).'},
/* SULIT (20%) */
{d:'h',q:'Dina ___ eat meat because she is a vegetarian.',o:['doesn\'t','don\'t','isn\'t','not'],ex:'Subjek she dengan verb eat memakai doesn\'t.'},
{d:'h',q:'Which part is wrong? "Does your father works in a bank?"',o:['works','Does','in','a bank'],ex:'Setelah Does, verb kembali ke bentuk dasar: Does your father work...?'},
{d:'h',q:'My friends and I ___ to the library every Friday.',o:['go','goes','going','is go'],ex:'My friends and I = we, jadi verb tanpa s.'},
{d:'h',q:'Everyone ___ happy when the holiday comes.',o:['is','are','am','be'],ex:'Everyone dianggap tunggal, memakai is.'},
{d:'h',q:'The news ___ very interesting today.',o:['is','are','am','do'],ex:'News adalah kata benda tak terhitung (tunggal), memakai is.'},
{d:'h',q:'Ani never ___ late to school.',o:['comes','come','coming','is come'],ex:'Never tidak mengubah aturan: Ani = she, jadi come + s.'},
{d:'h',q:'___ your parents drive to work every day?',o:['Do','Does','Is','Are'],ex:'Your parents = they, jadi memakai Do.'},
{d:'h',q:'Budi plays the guitar. Make a question: ___ Budi ___ the guitar?',o:['Does ... play','Do ... plays','Does ... plays','Is ... play'],ex:'Does + subjek + verb dasar: Does Budi play the guitar?'},
{d:'h',q:'My teacher always ___ us a lot of homework.',o:['gives','give','giving','gived'],ex:'My teacher = she/he, jadi give + s. Always adalah penanda simple present.'},
{d:'h',q:'Which sentence is correct?',o:['He doesn\'t have a pet.','He doesn\'t has a pet.','He don\'t have a pet.','He not have a pet.'],ex:'Setelah doesn\'t, pakai have (bukan has).'},
{d:'h',q:'"Does she like coffee?" "No, ___."',o:['she doesn\'t','she don\'t','she isn\'t','she not'],ex:'Jawaban singkat mengulang kata bantu: No, she doesn\'t.'},
{d:'h',q:'The students ___ their uniform on Monday.',o:['wear','wears','wearing','is wear'],ex:'The students = they, verb tanpa s.'},
{d:'h',q:'Mr. Hasan ___ his car every Sunday.',o:['washes','wash','washs','washing'],ex:'Wash berakhiran -sh, jadi ditambah es: washes.'},
{d:'h',q:'There ___ two books on the table.',o:['are','is','am','does'],ex:'There are dipakai untuk benda jamak (two books).'}
];
