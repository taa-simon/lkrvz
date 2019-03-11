looker.plugins.visualizations.add({
    // Id and Label are legacy properties that no longer have any function besides documenting
    // what the visualization used to have. The properties are now set via the manifest
    // form within the admin/visualizations page of Looker
    // id: "legacy",
    // label: "Deprecated",
    options: {
      debug: {
        type: "boolean",
        label: "Debug Mode",
        default: true
      },
      font_size: {
        type: "string",
        label: "Font Size",
        values: [
          {"Large": "large"},
          {"Small": "small"}
        ],
        display: "radio",
        default: "large"
      }
    },
    // Set up the initial state of the visualization
    create: function(element, config) {
  
      // Insert a <style> tag with some styles we'll use later.
      element.innerHTML = `
        <style>
        <style>
        .hello-world-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
        </style>
      `
  
      // Create a container element to let us center the text.
      var container = element.appendChild(document.createElement("div"))
      container.className = "hello-world-vis"
  
      // Create an element to contain the text.
      this._textElement = container.appendChild(document.createElement("div"))
      

    },
    // Render in response to the data or settings changing
    updateAsync: function(data, element, config, queryResponse, details, done) {
      function buildDebugPre(id, content, parent){
        if(document.getElementById(id)) {
          el = document.getElementById(id)
        } else {
          el = document.createElement('pre')
          el.setAttribute('id', id)
          parent.appendChild(el)
        }

        el.innerHTML = content
        
        // sel = '#' + id
        // if($(sel).length){
  
        // } else {
          // _textElement.appendChild($('<pre id=' + id + '>'))
        // }
        
        // $(sel).innerHTML(content)
      }
  
      // Clear any errors from previous updates
      this.clearErrors()
  
      // Throw some errors and exit if the shape of the data isn't what this chart needs
      // if (queryResponse.fields.dimensions.length == 0) {
      //   this.addError({title: "No Dimensions", message: "This chart requires dimensions."})
      //   return
      // }
  
      // if debug, write out all the data
      if(config.debug){
        id = 'data_pre'
        if(document.getElementById(id)) {
          el = document.getElementById(id)
        } else {
          el = document.createElement('pre')
          el.setAttribute('id', id)
          this._textElement.appendChild(el)
        }

        document.getElementById(id).innerHTML = data
        // buildDebugPre("data_pre", data, this._textElement)
        // buildDebugPre("config_pre", config, this._textElement)
        // buildDebugPre("query_response_pre", queryResponse, this._textElement)
        // buildDebugPre("details_pre", details, this._textElement)
      }
      

      // Grab the first cell of the data
      var firstRow = data[0]
      var firstCell = firstRow[queryResponse.fields.dimensions[0].name]
  
      // Insert the data into the page
      this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell)
  
      // Set the size to the user-selected size
      if (config.font_size == "small") {
        this._textElement.className = "hello-world-text-small"
      } else {
        this._textElement.className = "hello-world-text-large"
      }
  
      // We are done rendering! Let Looker know.
      done()
    }
  })
