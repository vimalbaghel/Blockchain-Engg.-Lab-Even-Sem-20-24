const Web3 = require('web3');

let web3, accounts;
window.addEventListener("load", async() => {
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error(error);
        }
        accounts = await web3.eth.getAccounts();
        alert("Signed in with: "+ accounts[0]);
    }else{
        alert("Metamask Not Installed");
    }
})

const valueInput = document.getElementById('value');
const recipientInput = document.getElementById('recipient');
const sendTransactionBtn = document.getElementById('sendTransactionBtn');
let fetchBtn = document.getElementById('fetchBalance');
let balanceAddress = document.getElementById('address');
sendTransactionBtn.addEventListener("click", async() => {
    //convert integer value into wei equivalent. 
    const weiValue = web3.utils.toWei(valueInput.value);
    const recipient = recipientInput.value;
    const gasEstimated = await web3.eth.estimateGas({
        from: accounts[0],
        to: recipient,
        value: weiValue,
    })
    console.log(gasEstimated);
    web3.eth.sendTransaction({
        from: accounts[0],
        to: recipient,
        value: weiValue
    })
    .on('transactionHash', function(hash){
        alert("Transaction Hash: "+hash);
    })
    .on('receipt', function(receipt){
        console.log(receipt);
        web3.eth.getTransaction(receipt.transactionHash).then(console.log);
    })
    .on('error', console.error);
})
fetchBtn.addEventListener("click", async() => {
    alert(`Balance in wallet: ${await web3.eth.getBalance(balanceAddress.value)}`);
})
