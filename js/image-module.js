(($) => {
  $(document).ready(() => {
    
    const displayImages = {
      init() {
        this.cacheDom()
        this.render()
      },
      cacheDom() {
        this.$image_container = $("#image-container")
      },
      render() {
        const imageModuleData = imageData.image_module
        let imageList = ""
        imageModuleData.forEach(image => {
          imageList +=
          `<img src=${image.path_name} key=${image.key} class="module">`
        })
        this.$image_container.append(imageList)
      }
    }

    const imageSliderModal = {
      selectedImageKey: null,
      init() {
        this.cacheDom()
        this.bindImageHandler()
      },
      cacheDom() {
        this.$img = $("img")
      },
      bindImageHandler() {
        this.$img.click(e => { this.selectImage(null, e) })
      },
      rebindModalEvents() {
        $(".prev").click(() => { this.selectImage(this.prevImage()) })
        $(".next").click(() => { this.selectImage(this.nextImage()) })
        $(".exit").click(() => { this.exitModal() })
      },
      render(selectedImage) {
        $("body").append("<div class='blackout'></div>")
        $(selectedImage).hide().appendTo("body").fadeIn(500)
      },
      selectImage(key, e) {
        this.selectedImageKey = key !== null ? key : parseInt(($(e.currentTarget).attr("key")), 10)
        this.imageModal()
        this.render(this.modal)
        this.rebindModalEvents()
      },
      imageModal() {
        const imageDataObject = imageData.image_module[this.selectedImageKey]
        this.modal = `
          <div class="modal">
            <span class="prev">&larr;</span>
            <h3 class="modal-title">${imageDataObject.title}</h3>
            <img src=${imageDataObject.path_name} class="modal-image">
            <p>${imageDataObject.description}</p>
            <span class="next">&rarr;</span>
            <span class="exit">&times;</span>
          </div>`
      },
      exitModal() {
        $(".blackout").remove()
        $(".modal").remove()
      },
      prevImage() {
        // Clear memory leak
        this.exitModal()
        if (this.selectedImageKey === 0) {
          return imageData.image_module.length -1
        } else {
          return  this.selectedImageKey -1
        }
      },
      nextImage() {
        // Clear memory leak
        this.exitModal()
        if (this.selectedImageKey === imageData.image_module.length -1) {
          return 0
        } else {
          return this.selectedImageKey +1
        }
      }
    }

    displayImages.init()
    imageSliderModal.init()
  })

  // Declare variable in larger scope
  let imageData = null;

  (function() {
    const jsonURL = "data/image-module-data.json"
    $.getJSON(jsonURL).done(function(data) {
      imageData = data
    })
  })()

})(jQuery)
