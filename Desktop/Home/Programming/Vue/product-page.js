Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">

      <div class="product-image">
        <img :src="image">
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p><strong>&pound;30.00</strong><span class="heading"> (inc VAT)</span></p>


        <p class="heading">Colour:</p>
        <div v-for="(variant, index) in variants"
             class="color-box"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>

        <div class="clothing-sizes">
          <p class="heading">Size:</p>
          <ul v-for="variantSize in variantSizes"
              class="size-list">
            <li>{{ variantSize }}</li>
          </ul>
        </div>

        <div class="stock-levels">
          <p v-if="inStock">In Stock</p>
          <p v-else="!inStock"
             :style="styleStock">Out of Stock</p>
          <p v-if="onSale">
            <strong>ON SALE!</strong>
          </p>
          <p>Shipping: {{ shipping }}</p>
        </div>

        <div class="cart-button">
          <button @click="addToCart" :disabled="!inStock" id="add-item">ADD TO BAG</button>
        </div>

        <div class="product-details">
          <p class="heading">
            <strong>DETAILS:</strong>
          </p>
          <p>{{ description }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
        </div>

        <div class="browse-link">
          <p>To browse similar products please click <a v-bind:href="link">here</a></p>
        </div>

    </div>
  </div>
  `,
  data() {
    return {
        brand: 'Bulls 69 New York',
        product: 'Jumper',
        description: 'Oversized jumper',
        onSale: false,
        selectedVariant: 0,
        link: '#',
        details: ["80% cotton", "20% polyester", "Machine-washable"],
        styleStock: {
          color: 'grey',
          textDecoration: 'line-through',
        },
        variantSizes: ["6", "8", "10", "12", "14", "16", "18"],
        variants: [
          {
            variantId: 0001,
            variantColor: "blue",
            variantImage: './images/blue-bulls-jumper.jpg',
            variantQuantity: 17,
          },
          {
            variantId: 0002,
            variantColor: "#800000",
            variantImage: './images/burgondy-bulls-jumper.jpg',
            variantQuantity: 0,
          }
        ],
        }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart')
    },
    updateProduct: function (index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
    computed: {
      title() {
        return this.brand + ' ' + this.product
      },
      image() {
        return this.variants[this.selectedVariant].variantImage
      },
      inStock() {
        return this.variants[this.selectedVariant].variantQuantity
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
        return 2.99
      }
    }
})

var app = new Vue ({
  el: '#app',
  data: {
    premium: true,
    cart: 0,
  },
  methods: {
    updateCart() {
      this.cart += 1
    }
  }
})
