let cats = [
  {
    id: "1",
    name: "cat 1",
    description: "Cat description goes here",
    price: "12.99",
    src: "https://raw.githubusercontent.com/ivanmmarkovic/misc/master/images/cats-images-for-project/adorable-animal-blur-cat-617278.jpg",
    count: "3",
  },
  {
    id: "2",
    name: "cat 2",
    description: "Cat description goes here",
    price: "22.99",
    src: "https://raw.githubusercontent.com/ivanmmarkovic/misc/master/images/cats-images-for-project/animal-cat-face-close-up-feline-416160.jpg",
    count: "2",
  },
  {
    id: "3",
    name: "cat 3",
    description: "Cat description goes here",
    price: "17.99",
    src: "https://raw.githubusercontent.com/ivanmmarkovic/misc/master/images/cats-images-for-project/adorable-animal-cat-302280.jpg",
    count: "5",
  },
  {
    id: "4",
    name: "cat 4",
    description: "Cat description goes here",
    price: "27.99",
    src: "https://raw.githubusercontent.com/ivanmmarkovic/misc/master/images/cats-images-for-project/adorable-animal-baby-blur-177809.jpg",
    count: "3",
  },
];

let comments = ["Do you have a cat with a hat?", "Nice"];

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      cats: cats,
      cart: [],
      display: {
        cats: true,
        cart: false,
        comments: false,
      },
      comments: comments,
      cartLinkClassName: "material-icons",
    };
  }
  addToCart(id) {
    console.log("Added :", id);
    let cats = this.state.cats;
    let cart = this.state.cart;
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].id == id && cats[i].count > 0) {
        if (cart.length === 0) {
          cats[i].count = cats[i].count - 1;
          let cat = Object.assign({}, cats[i]);
          delete cat.count;
          cat.howMany =
            typeof cat.howMany === "undefined" ? 1 : cat.howMany + 1;
          cart.push(cat);
        } else {
          let result = cart.filter((item) => item.id == cats[i].id);
          if (result.length === 1) {
            for (let j = 0; j < cart.length; j++) {
              if (cart[j].id == cats[i].id) {
                cats[i].count = cats[i].count - 1;
                cart[j].howMany++;
              }
            }
          } else {
            cats[i].count--;
            let cat = Object.assign({}, cats[i]);
            delete cat.count;
            cat.howMany =
              typeof cat.howMany === "undefined" ? 1 : cat.howMany + 1;
            cart.push(cat);
          }
        }
      }
    }
    this.setState({
      cats: cats,
      cart: cart,
      cartLinkClassName: "material-icons rotateBasket",
    });
    setTimeout(
      () =>
        this.setState({
          cartLinkClassName: "material-icons",
        }),
      2000
    );
  }
  removeItem(id) {
    let cats = this.state.cats;
    let cart = this.state.cart;
    let itemsToGetBack = 0;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id) {
        let cartIndex = i;
        itemsToGetBack = cart[i].howMany;
        cart.splice(cartIndex, 1);
      }
    }
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].id == id) {
        cats[i].count = cats[i].count + itemsToGetBack;
      }
    }
    this.setState({
      cats: cats,
      cart: cart,
    });
  }
  displayThisComponent(comp) {
    switch (comp) {
      case "cats":
        this.setState({
          display: {
            cats: true,
            cart: false,
            comments: false,
          },
        });
        break;
      case "cart":
        this.setState({
          display: {
            cats: false,
            cart: true,
            comments: false,
          },
        });
        break;
      case "comments":
        this.setState({
          display: {
            cats: false,
            cart: false,
            comments: true,
          },
        });
        break;
    }
  }
  addComment(comment) {
    let comments = this.state.comments;
    comments.push(comment);
    this.setState({
      comments: comments,
    });
  }
  render() {
    let cats = this.state.display.cats ? (
      <Cats cats={this.state.cats} addToCart={this.addToCart.bind(this)} />
    ) : (
      ""
    );
    let cart = this.state.display.cart ? (
      <Cart cart={this.state.cart} removeItem={this.removeItem.bind(this)} />
    ) : (
      ""
    );
    let comments = this.state.display.comments ? (
      <Comments
        comments={this.state.comments}
        addComment={this.addComment.bind(this)}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <nav>
          <span onClick={() => this.displayThisComponent("cats")}>
            <i className="material-icons">store</i>
          </span>
          <span onClick={() => this.displayThisComponent("cart")}>
            <i className={this.state.cartLinkClassName}>add_shopping_cart</i>
          </span>
          <span onClick={() => this.displayThisComponent("comments")}>
            <i className="material-icons">chat_bubble</i>
          </span>
        </nav>
        {cats}
        {cart}
        {comments}
      </div>
    );
  }
}

class Cats extends React.Component {
  render() {
    var addToCart = this.props.addToCart;
    var catsNodes = this.props.cats.map((cat, i) => (
      <Cat key={i} cat={cat} addToCart={addToCart} />
    ));
    return <div className="cats-all">{catsNodes}</div>;
  }
}

class Cat extends React.Component {
  render() {
    return (
      <div className="single-cat">
        <h3>{this.props.cat.name}</h3>
        <img src={this.props.cat.src} />
        <p>
          <b>Price</b> {this.props.cat.price} | {this.props.cat.count} available
        </p>
        <span onClick={() => this.props.addToCart(this.props.cat.id)}>
          <i className="material-icons">add_shopping_cart</i>
        </span>
      </div>
    );
  }
}

class Cart extends React.Component {
  removeItem(id) {
    this.props.removeItem(id);
  }
  render() {
    const removeItem = this.removeItem.bind(this);
    let totalPrice = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      totalPrice =
        totalPrice + this.props.cart[i].price * this.props.cart[i].howMany;
    }
    totalPrice = totalPrice.toFixed(2);
    let itemsNodes = this.props.cart.map((item, i) => {
      let singleCatTotal = (item.price * item.howMany).toFixed(2);
      return (
        <div key={i} className="single-cat">
          <h3>{item.name}</h3>
          <img src={item.src} />
          <p>{item.description}</p>
          <p>
            Items {item.howMany} | price {item.price} | total {singleCatTotal}
          </p>
          <span onClick={() => removeItem(item.id)}>
            <i className="material-icons">delete</i>
          </span>
        </div>
      );
    });
    return (
      <div className="cart">
        <div className="items-wraper">{itemsNodes}</div>
        <h3>Total : {totalPrice}</h3>
      </div>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super();
    this.state = {
      comment: "",
    };
  }
  getComment(event) {
    this.setState({
      comment: event.target.value,
    });
  }
  addComment() {
    if (this.state.comment != "") {
      this.props.addComment(this.state.comment);
    }
    this.setState({
      comment: "",
    });
  }
  render() {
    let commentsNodes = this.props.comments.map((comment, i) => (
      <div key={i}>
        <p>{comment}</p>
      </div>
    ));
    return (
      <div className="comments">
        <h1>Comments</h1>
        <input
          type="text"
          onChange={this.getComment.bind(this)}
          value={this.state.comment}
        />
        <span>
          <i className="material-icons" onClick={this.addComment.bind(this)}>
            message
          </i>
        </span>
        <div className="comments-wrapper">{commentsNodes}</div>
      </div>
    );
  }
}

ReactDOM.render(<App cats={cats} />, document.getElementById("app"));
