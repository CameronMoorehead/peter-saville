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
        this.bindEvents()
      },
      cacheDom() {
        this.$img = $("img")
      },
      bindEvents() {
        this.$img.click(e => { this.selectImage(e) })
        $(".prev").click(() => { this.selectImage(this.prevImage) })
        $(".next").click(() => { this.selectImage(this.nextImage) })
        $(".exit").click(() => { this.exitModal() })
      },
      render(selectedImage) {
        $("body").append("<div class='blackout'></div>")
        $(selectedImage).hide().appendTo("body").fadeIn(500)
      },
      selectImage(e) {
        this.selectedImageKey = ($(e.currentTarget).attr("key"))
        this.imageModal()
        this.render(this.modal)
        this.bindEvents()
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

      },
      nextImage() {

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
function imageModal(title, des, path, key) {
  let modal =
    `<div class="modal">
      <span class="prev" onclick="prevImage('${key}')">&larr;</span>
      <h3 class="modal-title">${title}</h3>
      <img src=${path} class="modal-image">
      <p>${des}</p>
      <span class="next" onclick="nextImage('${key}')">&rarr;</span>
      <span class="exit" onclick="exitModal()">&times;</span>
    </div>`
  $("body").append("<div class='blackout'></div>")
  $(modal).hide().appendTo("body").fadeIn(500)
}
//   function prevImage(key) {
//     let prevKey = parseInt(key) -1
//     let imageDataObject = {}
//     if (parseInt(key) === 0) {
//       prevKey = imageArray.length -1
//       imageDataObject = imageModuleData[prevKey]
//     } else {
//       imageDataObject = imageModuleData[prevKey]
//     }
//     // clear from DOM for memory
//     exitModal()
//     return imageModal(
//       imageDataObject.title,
//       imageDataObject.description,
//       imageDataObject.path_name,
//       imageDataObject.key
//     )
//   }
//
//   function nextImage(key) {
//     let nextKey = parseInt(key) +1
//     let imageDataObject = {}
//     if (parseInt(key) === imageModuleData) {
//       nextKey = 0
//       imageDataObject = imageModuleData[nextKey]
//     } else {
//       imageDataObject = imageModuleData[nextKey]
//     }
//     exitModal()
//     return imageModal(
//       imageDataObject.title,
//       imageDataObject.description,
//       imageDataObject.path_name,
//       imageDataObject.key
//     )
//   }
//   function exitModal() {
//     $(".blackout").remove()
//     $(".modal").remove()
//   }
