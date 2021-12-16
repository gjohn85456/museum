const bayTickets = document.querySelector('.tickets_buy_btn');
let payment = document.querySelector('.payment');
const close_payment = document.querySelector('.payment_close');

bayTickets.addEventListener('click', () => console.log('hi'));
bayTickets.addEventListener('click', () => payment.classList.add('payment_active'));
close_payment.addEventListener('click', () => payment.classList.remove('payment_active'));

