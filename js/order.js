(function () {
    'use strict'

    var forms = document.querySelectorAll('#orderForm')

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                event.preventDefault();  // Prevent form submission and page reload
                addOrderToTable();
            }

            form.classList.add('was-validated')
        }, false)
    })
})();

// Function to add new order to the table
function addOrderToTable() {
    // Get form values
    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const orderDate = document.getElementById("orderDate").value;
    const email = document.getElementById("email").value;
    const flowerType = document.getElementById("flowerType").value;
    const paymentType = document.querySelector('input[name="paymentType"]:checked').value;

    // Get the table body
    const table = document.getElementById("orderTable").getElementsByTagName('tbody')[0];

    // Get the current number of rows in the table
    const rowCount = table.rows.length;

    // Create a new row and cells
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = rowCount+1;  // ++1 to get correct index
    newRow.insertCell(1).innerText = fullName;
    newRow.insertCell(2).innerText = phone;
    newRow.insertCell(3).innerText = orderDate;
    newRow.insertCell(4).innerText = email;
    newRow.insertCell(5).innerText = flowerType;
    newRow.insertCell(6).innerText = paymentType;

    // Reset form values
    document.getElementById("orderForm").reset();
    
    // Ẩn form nhập
    document.getElementById("orderForm").style.display = 'none';

    // Hiển thị thông báo đặt hàng thành công
    const successMessage = document.createElement("p");
    successMessage.innerText = "Đặt hàng thành công!";
    successMessage.className = "text-success text-center";
    document.querySelector('.modal-body').appendChild(successMessage);
}

// Sự kiện để hiển thị lại form khi mở modal
const orderModalElement = document.getElementById('orderModal');
orderModalElement.addEventListener('show.bs.modal', function () {
    document.getElementById("orderForm").style.display = 'block';  // Hiển thị lại form
    const successMessage = document.querySelector('.modal-body .text-success');
    if (successMessage) {
        successMessage.remove();  // Xóa thông báo thành công nếu có
    }
});