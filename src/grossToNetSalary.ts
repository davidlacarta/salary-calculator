export interface Props {
  annualGrossSalary: number;
}

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
    numString = Number(numString).toFixed(digits);
    numString += "";
  }

  var splitStr = numString.split(".");
  var splitLeft = splitStr[0];
  var splitRight = splitStr[1].substring(0, digits);

  if (digits == 0) return splitLeft;
  else return splitLeft + "." + splitRight;
}; //end truncateNumber

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
  if (false) var incremento_movilidad_geografica = reduccion_rendimiento_neto;
  else var incremento_movilidad_geografica = 0;

  if (false) var minusvalia_igual_superior_33 = 3500;
  else var minusvalia_igual_superior_33 = 0;

  if (false) var minusvalia_sup_65_o_movilidad_reducida = 7750;
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
function grossToNetSalary({ annualGrossSalary }: Props) {
  //datos por defecto, combos y checks
  var num_decimales = 2;

  /* Start: Validacion del formulario */
  var bruto_anual = annualGrossSalary;
  if (isNaN(bruto_anual) || bruto_anual <= 0) {
    throw Error("El sueldo bruto anual no es un dato correcto");
  }

  var edad = 30;
  if (isNaN(edad) || edad <= 0) {
    throw Error("La edad no es un dato correcto");
  }

  /* para evitar datos absurdos como hijos menores de 25 = -1 */
  var hijos_menores_25_anos = 0;
  if (isNaN(hijos_menores_25_anos)) {
    throw Error("El número de hijos menores de 25 años no es un dato correcto");
  }

  if (hijos_menores_25_anos < 0) {
    hijos_menores_25_anos = 0;
  }

  var hijos_menores_3_anos = 0;
  if (isNaN(hijos_menores_3_anos)) {
    throw Error("El número de hijos menores de 3 años no es un dato correcto");
  }

  if (hijos_menores_3_anos < 0) {
    hijos_menores_3_anos = 0;
  }

  var ascendente_mayor_65_menor_75 = 0;
  if (isNaN(ascendente_mayor_65_menor_75)) {
    throw Error(
      "El número de mayores de 65 años y menores de 75 años a cargo no es un dato correcto"
    );
  }

  if (ascendente_mayor_65_menor_75 < 0) {
    ascendente_mayor_65_menor_75 = 0;
  }

  var ascendente_mayor_75 = 0;
  if (isNaN(ascendente_mayor_75)) {
    throw Error(
      "El número de ascendientes mayores de 75 años a cargo no es un dato correcto"
    );
  }

  if (ascendente_mayor_75 < 0) {
    ascendente_mayor_75 = 0;
  }

  var menor_65_con_discapacidad_cargo = 0;
  if (isNaN(menor_65_con_discapacidad_cargo)) {
    throw Error(
      "El número de menores de 65 años a cargo con discapacidad a cargo no es un dato correcto"
    );
  }

  if (menor_65_con_discapacidad_cargo < 0) {
    menor_65_con_discapacidad_cargo = 0;
  }

  var numero_personas_deduccion_ascendientes = 0;
  if (isNaN(numero_personas_deduccion_ascendientes)) {
    throw Error(
      "El número de contribuyentes que aplican los mínimos por ascendiente no es un dato correcto"
    );
  }

  if (numero_personas_deduccion_ascendientes < 0) {
    numero_personas_deduccion_ascendientes = 0;
  }
  //NOTA: este valor se emplea como divisor (en los calculos de mínimos) no puede ser 0
  if (numero_personas_deduccion_ascendientes > 0)
    var divisor_para_minimos_deduccion_ascendientes =
      numero_personas_deduccion_ascendientes;
  else var divisor_para_minimos_deduccion_ascendientes = 1;

  var descendientes_con_minusvalia_33_al_65 = 0;
  if (isNaN(descendientes_con_minusvalia_33_al_65)) {
    throw Error(
      "El número de descendientes con grado de discapacidad entre 33% y 65%  no es un dato correcto"
    );
  }

  if (descendientes_con_minusvalia_33_al_65 < 0) {
    descendientes_con_minusvalia_33_al_65 = 0;
  }

  var descendientes_con_minusvalia_sup_al_65 = 0;
  if (isNaN(descendientes_con_minusvalia_sup_al_65)) {
    throw Error(
      "El número de descendientes con grado de discapacidad superior al 65% no es un dato correcto"
    );
  }

  if (descendientes_con_minusvalia_sup_al_65 < 0) {
    descendientes_con_minusvalia_sup_al_65 = 0;
  }

  var ascendientes_con_minusvalia_33_al_65 = 0;
  if (isNaN(ascendientes_con_minusvalia_33_al_65)) {
    throw Error(
      "El número de ascendientes con grado de discapacidad entre el 33% y el 65% no es un dato correcto"
    );
  }

  if (ascendientes_con_minusvalia_33_al_65 < 0) {
    ascendientes_con_minusvalia_33_al_65 = 0;
  }

  var ascendientes_con_minusvalia_sup_al_65 = 0;
  if (isNaN(ascendientes_con_minusvalia_sup_al_65)) {
    throw Error(
      "El número de ascendientes con grado de discapacidad igual o superior al 65% no es un dato correcto"
    );
  }

  if (ascendientes_con_minusvalia_sup_al_65 < 0) {
    ascendientes_con_minusvalia_sup_al_65 = 0;
  }
  /* paso 1: calcular base imponible */
  var cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(
    2017,
    bruto_anual,
    "A"
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
  if (false) {
    var minimo_hijos_beneficiarios = minimo_descendientes;
  } else {
    var minimo_hijos_beneficiarios = minimo_descendientes / 2;
  }

  var minimo_hijos_menores_3_anos = hijos_menores_3_anos * 2800;

  //Mín. por hijos <3 años en función de beneficiarios, según tenga hijos en exclusiva a efectos fiscales S/N (dependiente del minimo_hijos_menores_3_anos)
  if (false) {
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
  // if (false) {
  //   var minimo_descendientes_con_minusvalia_33_al_65_beneficiarios =
  //     minimo_descendientes_con_minusvalia_33_al_65;
  // } else {
  var minimo_descendientes_con_minusvalia_33_al_65_beneficiarios =
    minimo_descendientes_con_minusvalia_33_al_65 / 2;
  // }

  var minimo_descendientes_con_minusvalia_sup_al_65 =
    descendientes_con_minusvalia_sup_al_65 * 12000;
  // if (false) {
  //   var minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios =
  //     minimo_descendientes_con_minusvalia_sup_al_65;
  // } else {
  var minimo_descendientes_con_minusvalia_sup_al_65_beneficiarios =
    minimo_descendientes_con_minusvalia_sup_al_65 / 2;
  // }

  /* Estos valores dependen de "divisor_para_minimos_deduccion_ascendientes" */
  var minimo_ascendientes_con_minusvalia_33_al_65 =
    (ascendientes_con_minusvalia_33_al_65 * 3000) /
    divisor_para_minimos_deduccion_ascendientes;
  var minimo_ascendientes_con_minusvalia_sup_al_65 =
    (ascendientes_con_minusvalia_sup_al_65 * 12000) /
    divisor_para_minimos_deduccion_ascendientes;

  /* Si esta selccionado la opcion "grado de discapacidad entre el 33% y el 65%" tiene un valor fijo en caso contrario el dato es 0 */
  if (false) {
    var minimo_minusvalia_33_al_65 = 3000;
  } else {
    var minimo_minusvalia_33_al_65 = 0;
  }

  /* Si esta selccionado la opcion "grado de discapacidad superior al 65% o con movilidad reducida" tiene un valor fijo en caso contrario el dato es 0 */
  if (false) {
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
    "A",
    hijos_menores_25_anos,
    bruto_anual
  );
  // correccion tipo contrato laboral
  if ("1" == "1" && tipo_retencion < 2) tipo_retencion = 2;
  // correccion valor negativos!!!!!
  if (tipo_retencion < 0) tipo_retencion = 0;

  var importe_retencion = importe_final_retencion;
  var sueldo_neto = bruto_anual - seguridad_social - importe_retencion;
  var sueldo_neto_12_pagas = sueldo_neto / 12;
  // var pagas_extras = (bruto_anual - importe_retencion) / 14;
  // var salario_mensual = pagas_extras - seguridad_social / 12;

  /* fin paso4: calcular sueldo */
  return {
    monthlyNetSalary: Number(sueldo_neto_12_pagas.toFixed(1)),
  };
}

export default grossToNetSalary;
