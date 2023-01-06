const str = "str"
const float = "float"
const structures = {
  float: [
    1,
    [
      4,
      "__VALUE__"
    ]
  ],
  string: [
    1,
    [
      10,
      "__VALUE__"
    ]
  ],
  angle: [
    1,
    [
      9,
      "__VALUE__"
    ]
  ],
  field: [
    "__VALUE__",
    null
  ]
}

function a(type, name, structure, isField) {
  return { type, name, structure, isField: Boolean(isField) }
}

export default {
  go_to: {
    args: {
      x: a(float, "X", structures.float),
      y: a(float, "Y", structures.float)
    },
    opcode: "motion_gotoxy"
  },
  move_steps: {
    args: {
      steps: a(float, "STEPS", structures.float)
    },
    opcode: "motion_movesteps"
  },
  turn: {
    args: {
      degrees: a(float, "DEGREES", structures.float)
    },
    opcode: "motion_turnright"
  },
  go_to_sprite: {
    args: {
      sprite: a(str, "TO", structures.string)
    },
    opcode: "motion_goto"
  },
  glide_to_sprite: {
    args: {
      seconds: a(float, "SECS", structures.float),
      sprite: a(str, "TO", structures.string)
    },
    opcode: "motion_glideto"
  },
  glide_to: {
    args: {
      seconds: a(float, "SECS", structures.float),
      x: a(float, "X", structures.float),
      y: a(float, "Y", structures.float)
    },
    opcode: "motion_glidesecstoxy"
  },
  set_direction: {
    args: {
      direction: a(float, "DIRECTION", structures.angle)
    },
    opcode: "motion_pointindirection"
  },
  point_towards: {
    args: {
      sprite: a(str, "TOWARDS", structures.string)
    },
    opcode: "motion_pointtowards"
  },
  change_x: {
    args: {
      amount: a(float, "DX", structures.float)
    },
    opcode: "motion_changexby"
  },
  set_x: {
    args: {
      new_x: a(float, "X", structures.float)
    },
    opcode: "motion_setx"
  },
  change_y: {
    args: {
      amount: a(float, "DY", structures.float)
    },
    opcode: "motion_changeyby"
  },
  set_y: {
    args: {
      new_y: a(float, "Y", structures.float)
    },
    opcode: "motion_sety"
  },
  bounce_on_edge: {
    args: {},
    opcode: "motion_ifonedgebounce"
  },
  set_rot_style: {
    args: {
      new_style: a(str, "STYLE", structures.field, true)
    },
    opcode: "motion_setrotationstyle"
  },
  say_for_secs: {
    args: {
      message: a(str, "MESSAGE", structures.string),
      duration: a(float, "SECS", structures.float)
    },
    opcode: "looks_sayforsecs"
  },
  say: {
    args: {
      message: a(str, "MESSAGE", structures.string)
    },
    opcode: "looks_say"
  },
  think_for_secs: {
    args: {
      message: a(str, "MESSAGE", structures.string),
      duration: a(float, "SECS", structures.float)
    },
    opcode: "looks_thinkforsecs"
  },
  think: {
    args: {
      message: a(str, "MESSAGE", structures.string)
    },
    opcode: "looks_think"
  },
  set_costume: {
    args: {
      new_costume: a(str, "COSTUME", structures.string)
    },
    opcode: "looks_swtichcostumeto"
  },
  next_costume: {
    args: {},
    opcode: "looks_nextcostume"
  },
  set_backdrop: {
    args: {
      backdrop: a(str, "BACKDROP", structures.string)
    },
    opcode: "looks_switchbackdropto"
  },
  next_backdrop: {
    args: {},
    opcode: "looks_nextbackdrop"
  },
  change_size: {
    args: {
      amount: a(float, "CHANGE", structures.float)
    },
    opcode: "looks_changesizeby"
  },
  set_size: {
    args: {
      new_size: a(float, "SIZE", structures.float)
    },
    opcode: "looks_setsizeto"
  },
  change_graphic_effect: {
    args: {
      effect: a(str, "EFFECT", structures.field, true),
      amount: a(float, "CHANGE", structures.float)
    },
    opcode: "looks_changeeffectby"
  },
  set_graphic_effect: {
    args: {
      effect: a(str, "EFFECT", structures.field, true),
      new_value: a(float, "VALUE", structures.float)
    },
    opcode: "looks_seteffectto"
  },
  clear_graphic_effects: {
    args: {},
    opcode: "looks_cleargraphiceffects"
  },
  show: {
    args: {},
    opcode: "looks_show"
  },
  hide: {
    args: {},
    opcode: "looks_hide"
  },
  set_layer_front_back: {
    args: {
      front_or_back: a(str, "FRONT_BACK", structures.field, true)
    },
    opcode: "looks_gotofrontback"
  },
  change_layer: {
    args: {
      amount: a(float, "NUM", structures.float),
      forward_or_backward: a(str, "FORWARD_BACKWARD", structures.field, true)
    },
    opcode: "looks_goforwardbackwardlayers"
  },
  play_sound: {
    args: {
      sound: a(str, "SOUND_MENU", structures.string)
    },
    opcode: "sound_playuntildone"
  },
  start_sound: {
    args: {
      sound: a(str, "SOUND_MENU", structures.string)
    },
    opcode: "sound_play"
  },
  stop_sounds: {
    args: {},
    opcode: "sound_stopallsounds"
  },
  change_sound_effect: {
    args: {
      effect: a(str, "EFFECT", structures.field, true),
      amount: a(float, "VALUE", structures.float)
    },
    opcode: "sound_changeeffectby"
  },
  set_sound_effect: {
    args: {
      effect: a(str, "EFFECT", structures.field, true),
      amount: a(float, "VALUE", structures.float)
    },
    opcode: "sound_seteffectto"
  },
  clear_sound_effects: {
    args: {},
    opcode: "sound_cleareffects"
  },
  change_volume: {
    args: {
      amount: a(float, "VOLUME", structures.float)
    },
    opcode: "sound_changevolumeby"
  },
  set_volume: {
    args: {
      new_volume: a(float, "VOLUME", structures.float)
    },
    opcode: "sound_setvolumeto"
  },
  broadcast: {
    args: {
      signal: a(str, "BROADCAST_INPUT", structures.str)
    },
    opcode: "event_broadcast"
  },
  broadcast_and_wait: {
    args: {
      signal: a(str, "BROADCAST_INPUT", structures.str)
    },
    opcode: "event_broadcastandwait"
  },
  sleep: {
    args: {
      duration: a(float, "DURATION", structures.float)
    },
    opcode: "control_wait"
  },
  stop: {
    args: {
      scope: a(str, "STOP_OPTION", structures.field, true)
    },
    opcode: "control_stop"
  },
  clone: {
    args: {
      sprite: a(str, "CLONE_OPTION", structures.string)
    },
    opcode: "control_create_clone_of"
  },
  delete_this_clone: {
    args: {},
    opcode: "control_delete_this_clone"
  },
  prompt: {
    args: {
      prompt: a(str, "QUESTION", structures.string)
    },
    opcode: "sensing_askandwait"
  },
  set_draggable: {
    args: {
      drag_mode: a(str, "DRAG_MODE", structures.field, true)
    },
    opcode: "sensing_setdragmode"
  },
  reset_timer: {
    args: {},
    opcode: "sensing_resettimer"
  }
}