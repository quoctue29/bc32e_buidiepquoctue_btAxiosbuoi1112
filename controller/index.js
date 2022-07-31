//------------------------GET: Lấy dữ liệu từ server về ----------------------------------------

function layDanhSachProductApi () {
 
    var promise = axios({
           url: 'https://svcy.myclass.vn/api/Product/GetAll', //đường dẫn BE cung cấp
           method: 'GET',//method BE
       })
       // xử lý thành công 
       promise.then(function(result) {
           console.log(result.data);
           //sau khi lấy dữ liệu từ BE về dùng dữ liệu đó tạo ra tr trên table 
           renderProductInfo(result.data);
       });
       //xử lý thất bại
       promise.catch(function(error) {
   
       });
   }
   // gọi hàm lấy dữ liệu từ sever khi trang web vừa load xong
   window.onload = function() {
        layDanhSachProductApi();
   }
   
   
   
   
   
   //------------------------POST: Thêm dữ liệu  -----------------------------------------------
   document.querySelector('#btnCreate').onclick = function () {
       var pt = new ProductInfo ();
       // lấy thông tin người dùng từ giao diện nhập liệu
       pt.id = document.querySelector('#id').value;
       pt.name = document.querySelector('#name').value;
       pt.price = document.querySelector('#price').value;
       pt.image = document.querySelector('#img ').value;
       pt.type = document.querySelector('#type').value;
       pt.description = document.querySelector('#productDescrption').value;

       //gọi api đưa dữ liệu về bE
       var promise = axios ({
           url: 'https://svcy.myclass.vn/api/Product/CreateProduct',
           method: 'POST',
           data: pt
       });
        // xử lý thành công 
        promise.then(function(result) {
           console.log(result.data);
           //sau khi lấy dữ liệu từ BE về dùng dữ liệu đó tạo ra tr trên table 
           layDanhSachProductApi();
       });
       //xử lý thất bại
       promise.catch(function(error) {
   
       });
   }
   





/**
 * Hàm này sẽ nhận vào 1 array (ProductInfo) và trả ra output là string <tr>....</tr>
 * @param {*} arrSinhVien arrProductInfo là mảng các object,...
 * @returns trả ra 1 giá trị là 1 htmlString '<tr>...</tr> <tr>...</tr>'
 */
 function renderProductInfo(arrProductInfo) { //param : input :arrSinhVien
    var html = ''; //output: string html 
    for (var i = 0; i < arrProductInfo.length; i++) {
        var pt = arrProductInfo[i]; //Mỗi lần duyệt lấy ra 1 object ProductInfo từ mảng 
        html += `
            <tr>
                <td>${pt.id}</td>
                <td><img src="${pt.img}" style="width:100%"/></td>
                <td>${pt.name}</td>
                <td>${pt.price}</td>
                <td>${pt.description}</td>
                <td>${pt.type}</td>
                
                <td>
                    <button class="btn btn-primary mr-2" onclick="chinhSua('${pt.id}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaProduct('${pt.id}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tblProduct').innerHTML = html;
}


   //------------------------Del: Xóa dữ liệu  -----------------------------------------------

function xoaProduct(maProductClick) {


    var promise = axios ({
        url: 'https://svcy.myclass.vn/api/Product/DeleteProduct/'+ maProductClick,
        method: 'DELETE'
    });
     // xử lý thành công 
     promise.then(function(result) {
        console.log(result.data);
        //sau khi lấy dữ liệu từ BE về dùng dữ liệu đó tạo ra tr trên table 
        layDanhSachProductApi();
    });
    //xử lý thất bại
    promise.catch(function(error) {

    });
}
//----------------------Chỉnh sửa dữ liệu  -----------------------------------------------


function chinhSua(id) {


    var promise = axios ({
        url: 'https://svcy.myclass.vn/api/Product/GetById/'+ id,
        method: 'GET'
    });
     // xử lý thành công 
     promise.then(function(result) {

        var pt = result.data;
        //đem product gán lên các thẻ
        document.querySelector('#id').value = pt.id;
        document.querySelector('#name').value =  pt.name;
        document.querySelector('#price').value = pt.price;
        document.querySelector('#img ').value = pt.image;
        document.querySelector('#type').value = pt.type;
        document.querySelector('#productDescrption').value =  pt.description;
 


        //sau khi lấy dữ liệu từ BE về dùng dữ liệu đó tạo ra tr trên table 
        layDanhSachProductApi();
    });
    //xử lý thất bại
    promise.catch(function(error) {

    });
}


//----------------------PUT: update dữ liệu  -----------------------------------------------

document.querySelector('#btnUpdate').onclick = function() {
    var ptUpdate = new ProductInfo()
    
    ptUpdate.id = document.querySelector('#id').value;
    ptUpdate.name = document.querySelector('#name').value;
    ptUpdate.price = document.querySelector('#price').value;
    ptUpdate.image = document.querySelector('#img ').value;
    ptUpdate.type = document.querySelector('#type').value;
    ptUpdate.description = document.querySelector('#productDescrption').value;

    //gọi api đưa dữ liệu về bE
    var promise = axios ({
        url: 'https://svcy.myclass.vn/api/Product/UpdateProduct/'+ptUpdate.id,
        method: 'PUT',
        data: ptUpdate
    });
     // xử lý thành công 
     promise.then(function(result) {
        console.log(result.data);
        //sau khi lấy dữ liệu từ BE về dùng dữ liệu đó tạo ra tr trên table 
        layDanhSachProductApi();
    });
    //xử lý thất bại
    promise.catch(function(error) {

    });
}

//-------------------------------Tìm kiếm dữ liệu----------------------------------

document.querySelector('#btnSearch').onclick =function(){
    console.log("Ô")
    var thongBao = document.querySelector('#tuKhoa').value;
    var promise = axios({
        url:'https://svcy.myclass.vn/api/Product/SearchByName?name='+thongBao,
        method:'GET'
    })
    promise.then(function(result){
        console.log(result.data)
      
        renderSanPham(result.data)
        document.querySelector('#err_notfind').innerHTML = '';
    })
    promise.catch(function(err){
        console.log(err.response.data.content)
        //dom
        document.querySelector('#err_notfind').innerHTML = 'Không tìm thấy giá trị !';
        layDanhSachProductApi();
    })
}