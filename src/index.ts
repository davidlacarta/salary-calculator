const $movilidad_geografica = document.getElementById(
  "movilidad_geografica"
) as HTMLInputElement;
const $minusvalia_33_al_65 = document.getElementById(
  "minusvalia_33_al_65"
) as HTMLInputElement;
const $minusvalia_sup_al_65 = document.getElementById(
  "minusvalia_sup_al_65"
) as HTMLInputElement;
const $div_error = document.getElementById("error");
const $numero_pagas = document.getElementById(
  "numero_pagas"
) as HTMLInputElement;
const $resultados_calculadora_nomina = document.getElementById(
  "resultados_calculadora_nomina"
);
const $categoria_profesional = document.getElementById(
  "categoria_profesional"
) as HTMLInputElement;
const $hijos_en_exclusiva = document.getElementById(
  "hijos_en_exclusiva"
) as HTMLInputElement;
const $situacion_familiar = document.getElementById(
  "situacion_familiar"
) as HTMLInputElement;
const $tipo_contrato_laboral = document.getElementById(
  "tipo_contrato_laboral"
) as HTMLInputElement;
const $bruto_anual = document.getElementById("bruto_anual") as HTMLInputElement;
const $edad = document.getElementById("edad") as HTMLInputElement;
const $hijos_menores_25_anos = document.getElementById(
  "hijos_menores_25_anos"
) as HTMLInputElement;
const $hijos_menores_3_anos = document.getElementById(
  "hijos_menores_3_anos"
) as HTMLInputElement;
const $ascendente_mayor_65_menor_75 = document.getElementById(
  "ascendente_mayor_65_menor_75"
) as HTMLInputElement;
const $ascendente_mayor_75 = document.getElementById(
  "ascendente_mayor_75"
) as HTMLInputElement;
const $menor_65_con_discapacidad_cargo = document.getElementById(
  "menor_65_con_discapacidad_cargo"
) as HTMLInputElement;
const $numero_personas_deduccion_ascendientes = document.getElementById(
  "numero_personas_deduccion_ascendientes"
) as HTMLInputElement;
const $descendientes_con_minusvalia_33_al_65 = document.getElementById(
  "descendientes_con_minusvalia_33_al_65"
) as HTMLInputElement;
const $descendientes_con_minusvalia_sup_al_65 = document.getElementById(
  "descendientes_con_minusvalia_sup_al_65"
) as HTMLInputElement;
const $ascendientes_con_minusvalia_33_al_65 = document.getElementById(
  "ascendientes_con_minusvalia_33_al_65"
) as HTMLInputElement;
const $ascendientes_con_minusvalia_sup_al_65 = document.getElementById(
  "ascendientes_con_minusvalia_sup_al_65"
) as HTMLInputElement;

/**
 * convierte una cadena a objeto Number
 * param: dato, string
 * return: NaN o Number object
 */
var f_format_string_to_number = function (dato: string) {
  return Number(dato.replace(".", "").replace(",", "."));
};

/**
 * Trunca (no redondea) un number a los digitos enviados
 * param: num, double, valor a convertir
 * param: digits, double, valor a convertir
 * return String: cadena truncada al numero de digitos
 */
var truncateNumber = function (num: number, digits: number) {
  let numString = num + "";
  //ojo, tengo que forzar a decimal siempre
  if (numString.indexOf(".") == -1) {
    //convierto al tipo number con 2 decimales
    numString = f_format_string_to_number(numString).toFixed(digits);
    numString += "";
  }

  var splitStr = numString.split(".");
  var splitLeft = splitStr[0];
  var splitRight = splitStr[1].substring(0, digits);

  if (digits == 0) return splitLeft;
  else return splitLeft + "." + splitRight;
}; //end truncateNumber

/**
 * Formatea el number enviado como parametro al formato: x.xxx.xxx,xx
 * @param num, number
 * @retrun string
 */
var formatNumber = function (num: number | string) {
  var separador = ".";
  var sepDecimal = ",";
  let numString = num + "";

  var splitStr = numString.split(".");
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? sepDecimal + splitStr[1] : "";
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, "$1" + separador + "$2");
  }
  return splitLeft + splitRight;
}; //end function formatNumber

function f_muestra_error(error: string) {
  if ($div_error) {
    $div_error.innerHTML = error;
  }
}

function f_calcuar_cuota_mensual_pagar(
  _: number,
  bruto_anual: number,
  categoria_profesional: string
) {
  var datos: { [key: string]: { min: number; max: number }[] } = {
    A: [{ min: 1052.9, max: 3751.2 }],
    B: [{ min: 956.1, max: 3751.2 }],
    C: [{ min: 831.6, max: 3751.2 }],
    D: [{ min: 825.6, max: 3751.2 }],
    E: [{ min: 825.6, max: 3751.2 }],
    F: [{ min: 825.6, max: 3751.2 }],
    G: [{ min: 825.6, max: 3751.2 }],
    H: [{ min: 825.6, max: 3751.2 }],
    I: [{ min: 825.6, max: 3751.2 }],
    J: [{ min: 825.6, max: 3751.2 }],
    K: [{ min: 825.6, max: 3751.2 }],
  };

  var cuota_mensual_pagar = 0;

  //alert(datos[categoria_profesional][0].min);
  if (bruto_anual / 12 < datos[categoria_profesional][0].min) {
    cuota_mensual_pagar = datos[categoria_profesional][0].min * 0.0635;
  } else if (bruto_anual / 12 > datos[categoria_profesional][0].max) {
    cuota_mensual_pagar = datos[categoria_profesional][0].max * 0.0635;
  } else {
    cuota_mensual_pagar = (bruto_anual / 12) * 0.0635;
  }

  return cuota_mensual_pagar;
}

function f_calcular_reduccion_rendimiento_neto(
  _: number,
  rendimiento_neto: number
) {
  var reduccion_comun_todos = 2000;

  if (rendimiento_neto < 11250) var reduccion_rendimiento_neto = 3700;
  else if (rendimiento_neto >= 14450) var reduccion_rendimiento_neto = 0;
  else
    var reduccion_rendimiento_neto =
      3700 - 1.15625 * (rendimiento_neto - 11250);

  //si el check de movilidad_geografica esta seleccionado
  if ($movilidad_geografica.checked)
    var incremento_movilidad_geografica = reduccion_rendimiento_neto;
  else var incremento_movilidad_geografica = 0;

  if ($minusvalia_33_al_65.checked) var minusvalia_igual_superior_33 = 3500;
  else var minusvalia_igual_superior_33 = 0;

  if ($minusvalia_sup_al_65.checked)
    var minusvalia_sup_65_o_movilidad_reducida = 7750;
  else var minusvalia_sup_65_o_movilidad_reducida = 0;

  //por el momento no tenemos los calculos para desempleados o pensionistas
  var reduccion_desempleado = 0;
  var reduccion_pesionista = 0;

  return (
    reduccion_comun_todos +
    reduccion_rendimiento_neto +
    incremento_movilidad_geografica +
    minusvalia_igual_superior_33 +
    minusvalia_sup_65_o_movilidad_reducida +
    reduccion_desempleado +
    reduccion_pesionista
  );
}

function f_calcular_minimo_personal(_: number, edad: number) {
  if (edad <= 65) {
    return 5550;
  } else if (edad > 75) {
    return 5550 + +918 + 1400;
  } else {
    return 5550 + 1150;
  }
}

function f_calcular_minimo_descendientes(
  _: number,
  hijos_menores_25_anos: number
) {
  if (hijos_menores_25_anos == 0) {
    return 0;
  } else if (hijos_menores_25_anos == 1) {
    return 2400;
  } else if (hijos_menores_25_anos == 2) {
    return 2400 + 2700;
  } else if (hijos_menores_25_anos == 3) {
    return 2400 + 2700 + 4000;
  } else if (hijos_menores_25_anos == 4) {
    return 2400 + 2700 + 4000 + 4500;
  } else {
    return 2400 + 2700 + 4000 + 4500 + 4500 * (hijos_menores_25_anos - 4);
  }
}

function f_calcular_tramos_base_liquidable(base_liquidable: number) {
  // tramo 1
  if (base_liquidable < 12450) {
    var tramo_1 = base_liquidable * 0.19;
  } else {
    var tramo_1 = 12450 * 0.19;
  }

  //tramo 2, si hay exceso en el tramo
  if (base_liquidable < 12450) {
    var tramo_2 = 0;
  } else {
    if (base_liquidable > 20200) {
      var tramo_2 = (20200 - 12450) * 0.24;
    } else {
      var tramo_2 = (base_liquidable - 12450) * 0.24;
    }
  }

  //tramo 3, si hay exceso en el tramo
  if (base_liquidable < 20200) {
    var tramo_3 = 0;
  } else {
    if (base_liquidable > 35200) {
      var tramo_3 = (35200 - 20200) * 0.3;
    } else {
      var tramo_3 = (base_liquidable - 20200) * 0.3;
    }
  }

  //tramo 4, si hay exceso en el tramo
  if (base_liquidable < 35200) {
    var tramo_4 = 0;
  } else {
    if (base_liquidable > 60000) {
      var tramo_4 = (60000 - 35200) * 0.37;
    } else {
      var tramo_4 = (base_liquidable - 35200) * 0.37;
    }
  }

  //tramo 5, ultimo tramo
  if (base_liquidable < 60000) {
    var tramo_5 = 0;
  } else {
    var tramo_5 = (base_liquidable - 60000) * 0.45;
  }

  //devuelvo el sumatorio de todos los tramos!!!!
  return tramo_1 + tramo_2 + tramo_3 + tramo_4 + tramo_5;
}

function f_calcular_tipo_retencion_situacion_contribuyente(
  _: number,
  tipo_retencion: number,
  situacion_familiar: "A" | "B" | "C",
  hijos_menores_25_anos: number,
  bruto_anual: number
) {
  var _tipo_retencion = 0;

  if (situacion_familiar == "A") {
    if (hijos_menores_25_anos == 0) return tipo_retencion;
    else if (hijos_menores_25_anos == 1) {
      if (bruto_anual <= 14266) return _tipo_retencion;
      else return tipo_retencion;
    } else {
      if (bruto_anual <= 15803) return _tipo_retencion;
      else return tipo_retencion;
    }
  } else if (situacion_familiar == "B") {
    if (hijos_menores_25_anos == 0) {
      if (bruto_anual <= 13696) return _tipo_retencion;
      else return tipo_retencion;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual <= 14985) return _tipo_retencion;
      else return tipo_retencion;
    } else {
      if (bruto_anual <= 17138) return _tipo_retencion;
      else return tipo_retencion;
    }
  } else if (situacion_familiar == "C") {
    if (hijos_menores_25_anos == 0) {
      if (bruto_anual <= 12000) return _tipo_retencion;
      else return tipo_retencion;
    } else if (hijos_menores_25_anos == 1) {
      if (bruto_anual <= 12607) return _tipo_retencion;
      else return tipo_retencion;
    } else {
      if (bruto_anual <= 13275) return _tipo_retencion;
      else return tipo_retencion;
    }
  }

  return 0;
}

// @ts-ignore: Not all paths return a value.
function f_calcular_nomina() {
  //datos por defecto, combos y checks
  var num_decimales = 2;

  /* Start: Validacion del formulario */
  var bruto_anual = f_format_string_to_number($bruto_anual.value);
  if (isNaN(bruto_anual) || bruto_anual <= 0) {
    f_muestra_error("El sueldo bruto anual no es un dato correcto");
    //alert("El sueldo bruto anual no es un dato correcto");
    return false;
  }

  var edad = f_format_string_to_number($edad.value);
  if (isNaN(edad) || edad <= 0) {
    //      alert("La edad no es un dato correcto");
    f_muestra_error("La edad no es un dato correcto");
    return false;
  }

  /* para evitar datos absurdos como hijos menores de 25 = -1 */
  var hijos_menores_25_anos = f_format_string_to_number(
    $hijos_menores_25_anos.value
  );
  if (isNaN(hijos_menores_25_anos)) {
    //alert("El número de hijos menores de 25 años no es un dato correcto");
    f_muestra_error(
      "El número de hijos menores de 25 años no es un dato correcto"
    );
    return false;
  }
  if (hijos_menores_25_anos < 0) {
    hijos_menores_25_anos = 0;
    $hijos_menores_25_anos.value = hijos_menores_25_anos + "";
  }

  var hijos_menores_3_anos = f_format_string_to_number(
    $hijos_menores_3_anos.value
  );
  if (isNaN(hijos_menores_3_anos)) {
    //alert("El número de hijos menores de 3 años no es un dato correcto");
    f_muestra_error(
      "El número de hijos menores de 3 años no es un dato correcto"
    );
    return false;
  }
  if (hijos_menores_3_anos < 0) {
    hijos_menores_3_anos = 0;
    $hijos_menores_3_anos.value = hijos_menores_3_anos + "";
  }

  var ascendente_mayor_65_menor_75 = f_format_string_to_number(
    $ascendente_mayor_65_menor_75.value
  );
  if (isNaN(ascendente_mayor_65_menor_75)) {
    //alert("El número de mayores de 65 años y menores de 75 años a cargo no es un dato correcto");
    f_muestra_error(
      "El número de mayores de 65 años y menores de 75 años a cargo no es un dato correcto"
    );
    return false;
  }
  if (ascendente_mayor_65_menor_75 < 0) {
    ascendente_mayor_65_menor_75 = 0;
    $ascendente_mayor_65_menor_75.value = ascendente_mayor_65_menor_75 + "";
  }

  var ascendente_mayor_75 = f_format_string_to_number(
    $ascendente_mayor_75.value
  );
  if (isNaN(ascendente_mayor_75)) {
    //alert("El número de ascendientes mayores de 75 años a cargo no es un dato correcto");
    f_muestra_error(
      "El número de ascendientes mayores de 75 años a cargo no es un dato correcto"
    );
    return false;
  }
  if (ascendente_mayor_75 < 0) {
    ascendente_mayor_75 = 0;
    $ascendente_mayor_75.value = ascendente_mayor_75 + "";
  }

  var menor_65_con_discapacidad_cargo = f_format_string_to_number(
    $menor_65_con_discapacidad_cargo.value
  );
  if (isNaN(menor_65_con_discapacidad_cargo)) {
    //alert("El número de menores de 65 años a cargo con discapacidad a cargo no es un dato correcto");
    f_muestra_error(
      "El número de menores de 65 años a cargo con discapacidad a cargo no es un dato correcto"
    );
    return false;
  }
  if (menor_65_con_discapacidad_cargo < 0) {
    menor_65_con_discapacidad_cargo = 0;
    $menor_65_con_discapacidad_cargo.value =
      menor_65_con_discapacidad_cargo + "";
  }

  var numero_personas_deduccion_ascendientes = f_format_string_to_number(
    $numero_personas_deduccion_ascendientes.value
  );
  if (isNaN(numero_personas_deduccion_ascendientes)) {
    //alert("El número de contribuyentes que aplican los mínimos por ascendiente no es un dato correcto");
    f_muestra_error(
      "El número de contribuyentes que aplican los mínimos por ascendiente no es un dato correcto"
    );
    return false;
  }
  if (numero_personas_deduccion_ascendientes < 0) {
    numero_personas_deduccion_ascendientes = 0;
    $numero_personas_deduccion_ascendientes.value =
      numero_personas_deduccion_ascendientes + "";
  }
  //NOTA: este valor se emplea como divisor (en los calculos de mínimos) no puede ser 0
  if (numero_personas_deduccion_ascendientes > 0)
    var divisor_para_minimos_deduccion_ascendientes =
      numero_personas_deduccion_ascendientes;
  else var divisor_para_minimos_deduccion_ascendientes = 1;

  var descendientes_con_minusvalia_33_al_65 = f_format_string_to_number(
    $descendientes_con_minusvalia_33_al_65.value
  );
  if (isNaN(descendientes_con_minusvalia_33_al_65)) {
    //alert("El número de descendientes con grado de discapacidad entre 33% y 65%  no es un dato correcto");
    f_muestra_error(
      "El número de descendientes con grado de discapacidad entre 33% y 65%  no es un dato correcto"
    );
    return false;
  }
  if (descendientes_con_minusvalia_33_al_65 < 0) {
    descendientes_con_minusvalia_33_al_65 = 0;
    $descendientes_con_minusvalia_33_al_65.value =
      descendientes_con_minusvalia_33_al_65 + "";
  }

  var descendientes_con_minusvalia_sup_al_65 = f_format_string_to_number(
    $descendientes_con_minusvalia_sup_al_65.value
  );
  if (isNaN(descendientes_con_minusvalia_sup_al_65)) {
    //alert("El número de descendientes con grado de discapacidad superior al 65% no es un dato correcto");
    f_muestra_error(
      "El número de descendientes con grado de discapacidad superior al 65% no es un dato correcto"
    );
    return false;
  }
  if (descendientes_con_minusvalia_sup_al_65 < 0) {
    descendientes_con_minusvalia_sup_al_65 = 0;
    $descendientes_con_minusvalia_sup_al_65.value =
      descendientes_con_minusvalia_sup_al_65 + "";
  }

  var ascendientes_con_minusvalia_33_al_65 = f_format_string_to_number(
    $ascendientes_con_minusvalia_33_al_65.value
  );
  if (isNaN(ascendientes_con_minusvalia_33_al_65)) {
    //alert("El número de ascendientes con grado de discapacidad entre el 33% y el 65% no es un dato correcto");
    f_muestra_error(
      "El número de ascendientes con grado de discapacidad entre el 33% y el 65% no es un dato correcto"
    );
    return false;
  }
  if (ascendientes_con_minusvalia_33_al_65 < 0) {
    ascendientes_con_minusvalia_33_al_65 = 0;
    $ascendientes_con_minusvalia_33_al_65.value =
      ascendientes_con_minusvalia_33_al_65 + "";
  }

  var ascendientes_con_minusvalia_sup_al_65 = f_format_string_to_number(
    $ascendientes_con_minusvalia_sup_al_65.value
  );
  if (isNaN(ascendientes_con_minusvalia_sup_al_65)) {
    //alert("El número de ascendientes con grado de discapacidad igual o superior al 65% no es un dato correcto");
    f_muestra_error(
      "El número de ascendientes con grado de discapacidad igual o superior al 65% no es un dato correcto"
    );
    return false;
  }
  if (ascendientes_con_minusvalia_sup_al_65 < 0) {
    ascendientes_con_minusvalia_sup_al_65 = 0;
    $ascendientes_con_minusvalia_sup_al_65.value =
      ascendientes_con_minusvalia_sup_al_65 + "";
  }
  /* paso 1: calcular base imponible */
  var cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(
    2017,
    bruto_anual,
    $categoria_profesional.value
  );
  var cuota_acumulado_ano = cuota_mensual_pagar * 12;
  var rendimiento_neto = bruto_anual - cuota_acumulado_ano;
  var reduccion_rendimiento_neto = f_calcular_reduccion_rendimiento_neto(
    2017,
    rendimiento_neto
  );
  if (hijos_menores_25_anos > 2) {
    reduccion_rendimiento_neto = reduccion_rendimiento_neto + 600;
  }

  var base_imponible =
    bruto_anual - cuota_acumulado_ano - reduccion_rendimiento_neto;
  //si base imponible es negativa, su valor es 0
  if (base_imponible < 0) base_imponible = 0;
  /* fin paso 1: calcular base imponible */

  /* paso 2: Calculo del Mín. personal y familiar*/
  var minimo_personal = f_calcular_minimo_personal(2017, edad);
  var minimo_descendientes = f_calcular_minimo_descendientes(
    2017,
    hijos_menores_25_anos
  );

  //Mínimo por hijos en función de beneficiarios, según tenga hijos en exclusiva a efectos fiscales S/N (dependiente del minimo_descendientes)
  if ($hijos_en_exclusiva.checked) {
    var minimo_hijos_beneficiarios = minimo_descendientes;
  } else {
    var minimo_hijos_beneficiarios = minimo_descendientes / 2;
  }

  var minimo_hijos_menores_3_anos = hijos_menores_3_anos * 2800;

  //Mín. por hijos <3 años en función de beneficiarios, según tenga hijos en exclusiva a efectos fiscales S/N (dependiente del minimo_hijos_menores_3_anos)
  if ($hijos_en_exclusiva.checked) {
    var minimo_hijos_menores_3_anos_beneficiarios = minimo_hijos_menores_3_anos;
  } else {
    var minimo_hijos_menores_3_anos_beneficiarios =
      minimo_hijos_menores_3_anos / 2;
  }

  /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
  var minimo_ascendente_mayor_65_menor_75 =
    (ascendente_mayor_65_menor_75 * 1150) /
    divisor_para_minimos_deduccion_ascendientes;
  var minimo_ascendente_mayor_75 =
    (ascendente_mayor_75 * 2550) / divisor_para_minimos_deduccion_ascendientes;
  var minimo_menor_65_con_discapacidad_cargo =
    (menor_65_con_discapacidad_cargo * 1150) /
    divisor_para_minimos_deduccion_ascendientes;

  /* minusvalias */
  var minimo_descendientes_con_minusvalia_33_al_65 =
    descendientes_con_minusvalia_33_al_65 * 3000;
  if ($hijos_en_exclusiva.checked) {
    var minimo_descendientes_con_minusvalia_33_al_65_beneficiarios =
      minimo_descendientes_con_minusvalia_33_al_65;
  } else {
    var minimo_descendientes_con_minusvalia_33_al_65_beneficiarios =
      minimo_descendientes_con_minusvalia_33_al_65 / 2;
  }

  var minimo_descendientes_con_minusvalia_sup_al_65 =
    descendientes_con_minusvalia_sup_al_65 * 12000;
  if ($hijos_en_exclusiva.checked) {
    var minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios =
      minimo_descendientes_con_minusvalia_sup_al_65;
  } else {
    var minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios =
      minimo_descendientes_con_minusvalia_sup_al_65 / 2;
  }

  /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
  var minimo_ascendientes_con_minusvalia_33_al_65 =
    (ascendientes_con_minusvalia_33_al_65 * 3000) /
    divisor_para_minimos_deduccion_ascendientes;
  var minimo_ascendientes_con_minusvalia_sup_al_65 =
    (ascendientes_con_minusvalia_sup_al_65 * 12000) /
    divisor_para_minimos_deduccion_ascendientes;

  /* Si esta selccionado la opcion "grado de discapacidad entre el 33% y el 65%" tiene un valor fijo en caso contrario el dato es 0 */
  if ($minusvalia_33_al_65.checked) {
    var minimo_minusvalia_33_al_65 = 3000;
  } else {
    var minimo_minusvalia_33_al_65 = 0;
  }

  /* Si esta selccionado la opcion "grado de discapacidad superior al 65% o con movilidad reducida" tiene un valor fijo en caso contrario el dato es 0 */
  if ($minusvalia_sup_al_65.checked) {
    var minimo_minusvalia_sup_al_65 = 12000;
  } else {
    var minimo_minusvalia_sup_al_65 = 0;
  }

  var suma_minimos =
    minimo_personal +
    minimo_hijos_beneficiarios +
    minimo_hijos_menores_3_anos_beneficiarios +
    minimo_ascendente_mayor_65_menor_75 +
    minimo_ascendente_mayor_75 +
    minimo_menor_65_con_discapacidad_cargo +
    minimo_descendientes_con_minusvalia_33_al_65_beneficiarios +
    minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios +
    minimo_ascendientes_con_minusvalia_33_al_65 +
    minimo_ascendientes_con_minusvalia_sup_al_65 +
    minimo_minusvalia_33_al_65 +
    minimo_minusvalia_sup_al_65;

  /* fin paso 2: Calculo del Mín. personal y familiar*/

  /* paso3: calcular retenciones */
  var cuota_retencion = Number(
    (
      f_calcular_tramos_base_liquidable(base_imponible) -
      f_calcular_tramos_base_liquidable(suma_minimos)
    ).toFixed(num_decimales)
  );

  var tipo_previo = (cuota_retencion / bruto_anual) * 100;
  var importe_previo_retencion = Number(
    ((tipo_previo / 100) * bruto_anual).toFixed(num_decimales)
  );

  //no hay deduccion
  var deduccion_400_euros = 0;
  //var tipo_final_retencion     =  (((importe_previo_retencion - deduccion_400_euros)/bruto_anual)*100).toFixed(num_decimales);

  //OJO!!!! truncado no redondeado > truncateNumber
  var tipo_final_retencion_truncado = Number(
    truncateNumber(
      ((importe_previo_retencion - deduccion_400_euros) / bruto_anual) * 100,
      num_decimales
    )
  );
  if (tipo_final_retencion_truncado < 0) tipo_final_retencion_truncado = 0;
  var importe_final_retencion =
    (tipo_final_retencion_truncado / 100) * bruto_anual;
  /* fin paso3: calcular retenciones */

  /* paso4: calcular sueldo */
  var seguridad_social = cuota_acumulado_ano;
  //var tipo_retencion          = tipo_final_retencion_truncado
  var tipo_retencion = f_calcular_tipo_retencion_situacion_contribuyente(
    2017,
    tipo_final_retencion_truncado,
    $situacion_familiar.value as "A" | "B" | "C",
    hijos_menores_25_anos,
    bruto_anual
  );
  // correccion tipo contrato laboral
  if ($tipo_contrato_laboral.value == "1" && tipo_retencion < 2)
    tipo_retencion = 2;
  // correccion valor negativos!!!!!
  if (tipo_retencion < 0) tipo_retencion = 0;

  var importe_retencion = importe_final_retencion;
  var sueldo_neto = bruto_anual - seguridad_social - importe_retencion;
  var sueldo_neto_12_pagas = sueldo_neto / 12;
  var pagas_extras = (bruto_anual - importe_retencion) / 14;
  var salario_mensual = pagas_extras - seguridad_social / 12;

  /* fin paso4: calcular sueldo */

  ponerResultado(
    "celda_sueldo_bruto_anual_2017",
    bruto_anual.toFixed(1),
    "&euro;"
  );
  ponerResultado(
    "celda_sueldo_neto_anual_2017",
    sueldo_neto.toFixed(1),
    "&euro;"
  );
  ponerResultado(
    "celda_retenciones_IRPF_2017",
    importe_retencion.toFixed(1),
    "&euro;"
  );
  ponerResultado("celda_tipo_retencion_IRPF_2017", tipo_retencion, "%");
  ponerResultado("celda_coutas_ss_2017", seguridad_social.toFixed(1), "&euro;");
  if ($numero_pagas.value == "14") {
    ponerResultado(
      "celda_sueldo_neto_2017",
      salario_mensual.toFixed(1),
      "&euro;"
    );
    ponerResultado("celda_paga_extra_2017", pagas_extras.toFixed(1), "&euro;");
  } else {
    ponerResultado(
      "celda_sueldo_neto_2017",
      sueldo_neto_12_pagas.toFixed(1),
      "&euro;"
    );
  }

  if ($resultados_calculadora_nomina) {
    $resultados_calculadora_nomina.className = "";
  }

  if ($div_error) {
    $div_error.innerHTML = "";
  }

  f_enviar_al_ancla();
}

function ponerResultado(campo: string, valor: string | number, simbol: string) {
  if (typeof valor == "number") valor = valor.toFixed(2);

  var elemento = document.getElementById(campo);
  if (elemento) {
    elemento.innerHTML = formatNumber(valor) + simbol;
  }
}

function f_enviar_al_ancla() {
  //compruebo que la tabla tiene el anchor > ancla_tabla_resultados
  var ancla_tabla_resultados = document.getElementById(
    "ancla_tabla_resultados"
  );
  if (ancla_tabla_resultados) {
    //en caso de tenerlo, recalculamos la url para enviar al ancla...
    //recupero de la url actual, elimino el anchor y reenvio al anchor dentro de la tabla...
    var current_url = document.URL;
    if (current_url.indexOf("#") != -1) {
      //elimino las posibles anclas de la url (evito que se acumlen) y rehago la url
      var arr_url = current_url.split("#");
      current_url = arr_url[0];
    }
    current_url += "#tabla_resultados";
    location.href = current_url;
  }
}

window.onload = () => {
  document
    .getElementById("calcular_nomina")
    ?.addEventListener("click", f_calcular_nomina);
};
