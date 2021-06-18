
const connection = require('../config/db');
const handelRes = require('../config/handelRes').handelRes;
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');

exports.addUser = async function (req) {
    const uuidV4 = uuidv4();
    const dataNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let sql = "INSERT INTO users (id, fullName, mobile, email, updatedAt, createdAt)" +
        "VALUES ('" + uuidV4 + "', '" + req.body.fullName + "', '" + req.body.mobile + "', '" +
        req.body.email + "', '" + dataNow + "', '" + dataNow + "');";
    const [users] = await connection.promise().query(sql);

        var output = false;
    if (!users) {
         output = false;
         return output;
    }

    const Findsql = "SELECT * FROM users where" +
        " email = '" + req.body.email + "'" +
        " AND mobile = '" + req.body.mobile + "'";
    const [foundUsers] = await connection.promise().query(Findsql);
    output = foundUsers;
    return output;

}
exports.sendEmail = async function (data) {

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elsmeny.nour@gmail.com',
      pass: "**********"
    }
  });
  
  var mailOptions = {
    from: 'elsmeny.nour@gmail.com',
    to: data.email,
    subject: 'Sending Email using Node.js',
    html: '<html>'+
    '<body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">'+
    '  <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px green;">'+
    '    <thead>'+
    '      <tr>'+
    '        <th style="text-align:left;"><img style="max-width: 150px;" src="https://www.bachanatours.in/book/img/logo.png" alt="bachana tours"></th>'+
    '        <th style="text-align:right;font-weight:400;"> '+new Date()+'</th>'+
    '      </tr>'+
    '    </thead>'+
    '    <tbody>'+
    '      <tr>'+
    '        <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;">'+
    ' <p style="font-size:14px;margin:0 0 6px 0;"><span style="font-weight:bold;display:inline-block;min-width:150px">Order status</span><b style="color:green;font-weight:normal;margin:0">Pending</b></p>'+
    '          '+
    '<p style="font-size:14px;margin:0 0 0 0;"><span style="font-weight:bold;display:inline-block;min-width:146px">Order amount</span> '+data.amount+'</p>'+
    '   </td>'+
    '     </tr>'+
    '      <tr>'+
    '        <td style="height:35px;"></td>'+
    '      </tr>'+
    '      <tr>'+
    '       '+
    '        <td style="height:35px;"></td>'+
    '      </tr>'+
    '      <tr>'+
    '        <td style="width:50%;padding:20px;vertical-align:top">'+
    '          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px">Name</span> '+data.fullName+'</p>'+
    '          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Email</span> '+data.email+'</p>'+
    '          '+
    '        </td>'+
    '        <td>'+
    '          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">Phone</span> '+data.mobile+'</p>'+
    '          <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;">ID No.</span> '+data.id+'</p>'+
    '        </td>'+
    '        '+
    '      </tr>'+
    '      <tr>'+
    '        <td colspan="2" style="font-size:20px;padding:30px 15px 0 15px;">Items</td>'+
    '      </tr>'+
    '      <tr>'+
    '        <td colspan="2" style="padding:15px;">'+
    '          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;">'+
    '            <span style="display:block;font-size:13px;font-weight:normal;">Homestay with fooding & lodging</span> Rs. 3500 <b style="font-size:12px;font-weight:300;"> /person/day</b>'+
    '          </p>'+
    '          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Pickup & Drop</span> Rs. 2000 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>'+
    '          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Local site seeing with guide</span> Rs. 800 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>'+
    '          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Tea tourism with guide</span> Rs. 500 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>'+
    '          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">River side camping with guide</span> Rs. 1500 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>'+
    '          <p style="font-size:14px;margin:0;padding:10px;border:solid 1px #ddd;font-weight:bold;"><span style="display:block;font-size:13px;font-weight:normal;">Trackking and hiking with guide</span> Rs. 1000 <b style="font-size:12px;font-weight:300;"> /person/day</b></p>'+
    '        </td>'+
    '      </tr>'+
    '    </tbody>'+
    '    <tfooter>'+
    '      <tr>'+
    '        <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">'+
    '          <strong style="display:block;margin:0 0 10px 0;">Regards</strong> Bachana Tours<br> Gorubathan, Pin/Zip - 735221, Darjeeling, West bengal, India<br><br>'+
    '          <b>Phone:</b> 03552-222011<br>'+
    '          <b>Email:</b> contact@bachanatours.in'+
    '        </td>'+
    '      </tr>'+
    '    </tfooter>'+
    '  </table>'+
    '</body>'+
    ''+
    '</html>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return true;
}


