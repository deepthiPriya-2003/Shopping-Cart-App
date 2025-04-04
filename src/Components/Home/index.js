import {Component} from "react"

 import "./index.css" 
 

class Home extends Component{  
    state = {amount:0, cartList: []}
    productsList = [
        { id: 1, name: "Laptop", price: 500 },
        { id: 2, name: "Smartphone", price: 300 },
        { id: 3, name: "Headphones", price: 100 },
        { id: 4, name: "Smartwatch", price: 150 },
      ]; 

    
        
      
    
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.cartList !== this.state.cartList) {
          const total = this.state.cartList.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          if (total !== this.state.totalPrice) {
            this.setState({ amount: total });
          }
        }
      }
    
      


    onClickAdd=(event)=>{  
        const {cartList} = this.state
        const isThere =cartList.find((each) => (each.id === event)) 
        if (isThere === undefined) {
        const product=this.productsList.find((each) =>each.id === event  ) 
        const productwithQuantity = {...product , quantity:1 }  
        this.setState((prevState)=>({cartList: [...prevState.cartList, productwithQuantity]})) 
        }
        
    } 

    onClickIncrease=(id)=>{ 
        const {cartList} =this.state 
        
        const updatedCartList = cartList.map((each)=> {
            if (id === each.id ){
                return {...each, quantity:each.quantity+1, }
            }
            else{
                return each
            }
        }) 
        this.setState({cartList:updatedCartList})

    } 

    onClickDecrease=(id, quantity)=>{ 
        const {cartList} =this.state 

        if (quantity>1){
        
        const updatedCartList = cartList.map((each)=> {
            if (id === each.id ){
                return {...each, quantity:each.quantity-1, }
            }
            else{
                return each
            }
        }) 
         this.setState({cartList:updatedCartList})
          }
    }

    
    
    render(){
        const {cartList, amount}= this.state 
        const THRESHOLD = 1000;
        const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
    
        return(
            <div className ="shopping-cart-bg" >
                <h1>Shopping Cart</h1>
                
                <div className="bg">
                <h2>Product</h2> 
                           
                <div className="card-bg-container"> 
                    {this.productsList.map((eachproduct)=>
                        (
                        <div key={eachproduct.id} className="card">
                        <p className="product-name">{eachproduct.name}</p> 
                        <p>&#8377;{eachproduct.price}</p>
                        <button onClick={() => this.onClickAdd(eachproduct.id)} className="add-product-btn">Add to Cart</button>
                    </div>

                    ))}
                        
                </div>
                </div>
                <div className="bg ">
                <h2>Cart Summary</h2>
                <div className="bg-color">
                   <div className="margin"> 
                   
                    <div className="cart-amount" >
                        <p className="amount">subtotal</p> 
                        <p className="amount">&#8377;{amount}</p>
                        
                    </div>
                    <hr />
                    <div className="freeGift-bg-container">
                    { (amount>=THRESHOLD) ? <p>You got a free wireless mouse!</p>   :
                    <>
                    <p>Add &#8377;1000 to Get Free Wireless Mouse!</p>
                    <progress value={amount} max="1000" className="progress-bar"></progress> </>}
                    </div>
                    </div>
                    </div>
                </div> 

                <div className="bg">
                <h2>Cart Items</h2>
                <div className="bg-color">
                    {(cartList.length)===0?
                    <div className="empty-cart margin">
                       <p>Your cart is empty</p>
                       <p>Add some products to see here</p>
                       </div>:
                       <div className="margin">
                        {cartList.map((each) => ( 
                            <div key={each.id} className="cart-amount">  
                            <div>
                                <p className="product-name">{each.name}</p> 
                                <p>{`${each.price} * ${each.quantity} = ${each.price * each.quantity}`}</p>
                                </div>  
                                <div className="quantity-update-container">  
                                <button className="decrease-btn" onClick={()=> this.onClickDecrease(each.id, each.quantity)}>-</button> 
                                <p>{each.quantity}</p>
                                <button className="increase-btn" onClick={()=> this.onClickIncrease(each.id)}>+</button>
                                </div>  
                            </div>  
                        ))} 
                        {(amount>=THRESHOLD)&& 
                                <div className="cart-amount">
                                <div>
                                <p className="product-name">{FREE_GIFT.name}</p> 
                                <p>{`0 * 1 = 0`}</p>
                                </div>
                                 <div>
                                <button className="freeGift-btn">Free Gift</button>
                                </div>
                                    </div>
                                 
                                
                            }
                        
                       </div>

                     }
                </div>
                </div>
                </div> 

            
        )
    }
}

export default Home



