document.addEventListener('DOMContentLoaded', function () {
    const pricing = {
          1: {
              metrics: { monthly: 129, annual: 1290 },
              recover: { monthly: 69, annual: 690 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          2: {
              metrics: { monthly: 189, annual: 1890 },
              recover: { monthly: 129, annual: 1290 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          3: {
              metrics: { monthly: 249, annual: 2490 },
              recover: { monthly: 189, annual: 1890 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          4: {
              metrics: { monthly: 379, annual: 3790 },
              recover: { monthly: 249, annual: 2490 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          5: {
              metrics: { monthly: 499, annual: 4990 },
              recover: { monthly: 309, annual: 3090 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          6: {
              metrics: { monthly: 629, annual: 6290 },
              recover: { monthly: 379, annual: 3790 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          6: {
              metrics: { monthly: 749, annual: 7490 },
              recover: { monthly: 439, annual: 4390 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          },
          7: {
              metrics: { monthly: 879, annual: 8790 },
              recover: { monthly: 499, annual: 4990 },
              forecast: { monthly: 1000, annual: 12000 },
              cancellations: { monthly: 129, annual: 1290 },
          }
    }
    const contactUs = "Offert"
    const products = ["metrics", "recover", "cancellations", "forecast"]
    const range = document.getElementById("range")
    const price = document.getElementById("slider-price")
    const toggler = document.querySelector(".onoffswitch-checkbox")
    const monthlyText = document.getElementById("monthly-text")
    const totalPriceText = document.getElementById("total-price-text")
    const annualText = document.getElementById("annual-text")
    const checkBoxes = products.map(product => document.getElementById(product))
    const productPrices = products.map(product => document.getElementById(`${product}-price`))
    const pricingSave = document.querySelector(".pricing-save");
  
    const localeString = (num) => parseInt(num).toLocaleString()
  
    const isMonthly = () => !toggler.checked
  
    const checked = () => checkBoxes.reduce((arr, el) => {
      if (el.checked) arr.push(el.id)
      return arr
    }, [])
  
    const mrr = () => range.value;
  
    const closestPricePoint = () => Object.keys(pricing).find((key) => parseInt(key) > mrr());
  
    const priceForProduct = (product) => pricing[closestPricePoint()][product][isMonthly() ? "monthly" : "annual"]
  
    const total = () => {
      const closest = closestPricePoint();
      if (!closest) return contactUs;
      const values = checked().map(product => priceForProduct(product))
      if (values.includes(contactUs)) return contactUs;
      return values.reduce((prev, curr) => prev + curr, 0) / (isMonthly() ? 1 : 12)
    }
  
    const setProductPrices = () => {
      productPrices.forEach((pp) => {
        const closest = closestPricePoint()
        if (!closest) return pp.innerText = contactUs
        const price = priceForProduct(pp.id.split("-")[0])
        if (price === contactUs) return pp.innerText = contactUs
        pp.innerHTML = `${isMonthly() ? localeString(price) : localeString(Math.round(price / 12))} kr <span class="text-xs text-gray"> / mån</span>`
      })
    }
  
    const setTotalText = () => {
      const value = total();
      if (value === contactUs) totalPriceText.innerText = value;
      else totalPriceText.innerText = `${localeString(Math.round(value))} kr/ mån`
    }
  
    const setPrice = () => {
      price.innerText = `${localeString(range.value)} dagar per vecka`
      setTotalText()
      setProductPrices()
    }
  
    checkBoxes.forEach(box => box.addEventListener("change", setTotalText))
  
    toggler.addEventListener("change", () => {
      if (isMonthly()) {
        monthlyText.classList.remove("text-gray")
        annualText.classList.add("text-gray")
        pricingSave.hidden = true;
      } else {
        monthlyText.classList.add("text-gray")
        annualText.classList.remove("text-gray")
        pricingSave.hidden = false;
      }
      setPrice()
    })
    range.addEventListener("input", setPrice)
    setPrice()
  })
  
  