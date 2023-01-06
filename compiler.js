import zip from "https://deno.land/x/zipjs/index.js"

class BS3 {
  static ID() {
    "BS3-ID-" + String(Math.random()).replace(".", "")
  }

  static md5ext() {
    return (new Array(32)).fill(0).map(e => "1234567890abcdef"[Math.floor(Math.random() * 16)]).join("")
  }

  static asset(name, type, data) {
    var assetID = md5ext()
    assets[assetID] = data
    switch(type) {
      case "png":
      case "jpg":
      case "svg":
        return {
          "name": name,
          "dataFormat": type,
          "assetId": assetID,
          "md5ext": `${assetID}.${type}`,
          "rotationCenterX": 240,
          "rotationCenterY": 180
        }
      case "mp3":
      case "wav":
        return {
          "name": name,
          "assetId": assetID,
          "dataFormat": type,
          "rate": 48000, // MAY CAUSE BUGS; IDK
          "sampleCount": 3073253, // MAY CAUSE BUGS; IDK
          "md5ext": `${assetID}.${type}`
        }
      default:
        throw new Error("unrecognized file type!")
    }
  }

  static sprite(name) {
    return {
      "isStage": false,
      "name": name,
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [],
      "sounds": [],
      "volume": 100,
      "layerOrder": 0,
      "tempo": 60,
      "videoTransparency": 50,
      "videoState": "on",
      "textToSpeechLanguage": null
    }
  }

  static comment(blockID, text) {
    return {
      "blockId": blockID,
      "x": 0,
      "y": 0,
      "width": 200,
      "height": 200,
      "minimized": false,
      "text": text
    }
  }

  static menu(opcode, parent, data) {
    return {
      "opcode": opcode,
      "next": null,
      "parent": parent,
      "inputs": {},
      "fields": data,
      "shadow": true,
      "topLevel": !Boolean(parent)
    }
  }

  static block(opcode, next, parent, inputs, fields) {
    return {
      "opcode": opcode,
      "next": next,
      "parent": parent,
      "inputs": inputs ? inputs : {},
      "fields": fields ? fields : {},
      "shadow": true,
      "topLevel": true,
      "x": 0,
      "y": 0
    }
  }

  static async compile(code) {
    var project = {
      "targets": [], // sprites
      "monitors": [],
      "extensions": [],
      "meta": {
        "semver": "3.0.0",
        "vm": "1.23421341234.123490158",
        "agent": "screw you"
      }
    }
    var assets = {} // [file name]: [data uri]
    var zipReader = new zip.ZipReader(new zip.Data64URIReader(code))
    var files = await zipReader.getEntries()
    var projectInfo = JSON.parse(files.find(e => e.filename == "project.json"))
    var sprites = {}
    if(!projectInfo) {
      throw new Error("missing project.json file!")
    }
    projectInfo.sprites.forEach(async element => {
      let spriteToAdd = projectInfo.find(e => e.filename == element)
      let name = element.split("/")
      name = name[name.length - 1].split(".")[0]
      sprites[name] = await spriteToAdd.getData(new zip.TextWriter())
    })
    for(let sprite in sprites) {
      let data = sprites[sprite].split("\n")
      let topLevel = data.filter(e => !e[0] == "\t")
      let isStage = topLevel.includes("@stage")
      let spriteJSON = this.sprite(sprite)
      spriteJSON.isStage = isStage
      topLevel.forEach(line => {
        let words = line.split(" ")
        let keyword = words[0]
        switch(keyword) {
          case "@stage":
            "this does absolutely nothing"
          case "str":
          case "float":
          case "bool":
            if(/^[a-zA-Z0-9_]*$/.test(words[1]) && !/[0-9]/.test(words[1][0])) {
              if(words[2] == "=") {
                let typeIsValid = false
                if(keyword == "str") typeIsValid = typeof(JSON.parse(words[3])) == "string"
                if(keyword == "float") typeIsValid = !isNaN(Number(words[3]))
                if(keyword == "bool") typeIsValid = ["true", "false"].includes(words[3])
                if(typeIsValid) {
                  let variableID = keyword + "_" + this.ID()
                  spriteJSON.variables[variableID] = [words[1], words[3]]
                  project.monitors.push({
                    "id": variableID,
                    "mode": "default",
                    "opcode": "data_variable",
                    "params": {
                      "VARIABLE": words[1]
                    },
                    "spriteName": sprite,
                    "value": words[3],
                    "width": 0,
                    "height": 0,
                    "x": 0,
                    "y": 0,
                    "visible": false,
                    "sliderMin": 0,
                    "sliderMax": 100,
                    "isDiscrete": true
                  })
                }
              }
            }
        }
      })
    }
  }
}

export default BS3