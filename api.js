//apis انواع ال 
// 1. Get : يجلب بيانات من قاعدة البيانات ويعرضها في واجهة المستخدم
// 2. Post : يبعث بيانات من واجهة المستخدم الى قاعدة البيانات
// 3. Put : لتعديل بيانات من قاعدة البيانات
// 4. Delet : حذف بيانات من قاعدة البيانات

// express : تجعل المشروع مهيأ لارسال واستقبال البيانات

import express from "express"; // استدعاء المكتبة
const app = express(); // لتسهيل الاستخدام app ونخزينها في متغير اسمه express انشاء نسخة من 
const port = 5000; // تعريف البورت يلي بدنا نشتغل مشروعنا الحالي عليه

app.use(express.json());

/* app.get('/user', (req,res) => {
    res.send('Hello Tasneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeemmmmmmmmmmmmmmmmmmmm'); // لانه غيت تجلب بيانات ونحن بحاجة لرد ف بيرسل العبارة res حطينا
})

// json : NOSql وهو ، object هو اي شي الو مفتاح وقيمة للمفتاح / بكافئ ال
// شكلها : { "name" : "my-app" , "version" : "1.0.0" , ... } 
// 1. import express, 2. app = express 3. port
*/ 

let students = [
    {id : 1, name : "tasneem" , age : 22}
];
app.get('/api/students' , (req , res) => {
    res.status(200).json({                         // 200 : ok / success
        success : true,                            // العملية تمت بنجاح 
        count   : students.length,                   
        data    : students

    })                                 
})

app.post ('/api/students', (req , res) => {
    const newstudent = req.body;  //newstudent لنخزن محتوى الطلب يلي طلبناه داخل متغير ال
    if (!newstudent.name || !newstudent.age){    // أحد المعلومات ناقصة
        return res.status(400).json ({           // 400 : يعني في خطأ بالمعلومات
            success : false ,
            message : "Please enter name and age"
        });             
    }
    // : اذا ما في نقص بالمعلومات رح ينتقل لهالجزء
    newstudent.id = students.length +1;   // تبع القيمة الجديدة لازم يساوي طول المصفوفة+1 id ال 
    students.push(newstudent);            // push :students القيمة يلي دخلناها رح تتخزن في المصوفة 
    res.status(201).json({
        success : true ,
        count   : students.length,
        message : "New Student Added Successfully",
        data    : newstudent,
        data2   : students 
    });
});
/// put : ///
app.put('/api/students/:id' , (req, res) => {        //يعني هو قيمة متغيرة  id حطينا : قبل ال
    const studentId = parseInt(req.params.id)   //params : كلشي جاي من الايندبوينت
    //parseInt باستخدام int لذلك نحولها الى  string لما المستخدم يدخل قيمة رح يأخذها المتصفح ك 
    const {name , age} = req.body; // بيانات المستخدم الجديد
    const student = students.find(s => s.id === studentId);
    // s.id يلي دخلها المستخدم id قيمة ال 
    if (!student) {
        return res.status(404).json({
            success : false,
            message : "studennt not found"  
        });
    }
    // منختبر اذا عدلنا على الاسم او العمر  
    if(name) {
        student.name = name;
    }
    if(age) {
        student.age = age;
    }
    // الرسالة النهائية انو تم تعديل البيانات
    res.status(200).json({
        success : true,
        message : "student update successfully",
        data : student
    });
})  



app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});

