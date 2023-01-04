import * as zip from "https://deno.land/x/zipjs/index.js";

var id = 0
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

class Scratch {
  static ID() {
    return "BS3-ID-" + Date.now()
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
}

async function compile(code) {
  var zipReader = new zip.ZipReader(new zip.Data64URIReader(code))
  var files = await zipReader.getEntries()
  var projectInfo = JSON.parse(files.find(e => e.filename == "project.json"))
  var sprites = {}
  if(!projectInfo) {
    throw new Error("missing project.json file!")
  }
  project.targets.push(Scratch.sprite("Stage"))
  project.targets[0].isStage = true // make the stage the stage
  projectInfo.sprites.forEach(async element => {
    let spriteToAdd = projectInfo.find(e => e.filename == element)
    let name = element.split("/")
    name = name[name.length - 1].split(".")[0]
    sprites[name] = await spriteToAdd.getData(new zip.TextWriter())
  })
  for(let sprite in sprites) {
    let data = sprites[sprite].split("\n")
    let isStage = data[0] == "@stage"
  }
}

export default compile