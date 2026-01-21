
class B{
     login(){
        console.log('In the class B');
    }
}
class A extends B{
    login(){
        console.log('In the class A')
    }
}

let a = new A;
A.login();


