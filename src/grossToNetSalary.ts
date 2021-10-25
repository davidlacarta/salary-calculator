export interface Props {
  annualGrossSalary: number;
}

function f_calcuar_cuota_mensual_pagar(bruto_anual: number) {
  const min = 1052.9;
  const max = 3751.2;

  var cuota_mensual_pagar = 0;

  if (bruto_anual / 12 < min) {
    cuota_mensual_pagar = min * 0.0635;
  } else if (bruto_anual / 12 > max) {
    cuota_mensual_pagar = max * 0.0635;
  } else {
    cuota_mensual_pagar = (bruto_anual / 12) * 0.0635;
  }

  return cuota_mensual_pagar;
}

function f_calcular_reduccion_rendimiento_neto(rendimiento_neto: number) {
  var reduccion_comun_todos = 2000;

  if (rendimiento_neto < 11250) var reduccion_rendimiento_neto = 3700;
  else if (rendimiento_neto >= 14450) var reduccion_rendimiento_neto = 0;
  else
    var reduccion_rendimiento_neto =
      3700 - 1.15625 * (rendimiento_neto - 11250);

  return reduccion_comun_todos + reduccion_rendimiento_neto;
}

function f_calcular_tramos_base_liquidable(base_liquidable: number) {
  if (base_liquidable < 12450) {
    var tramo_1 = base_liquidable * 0.19;
  } else {
    var tramo_1 = 12450 * 0.19;
  }

  if (base_liquidable < 12450) {
    var tramo_2 = 0;
  } else {
    if (base_liquidable > 20200) {
      var tramo_2 = (20200 - 12450) * 0.24;
    } else {
      var tramo_2 = (base_liquidable - 12450) * 0.24;
    }
  }

  if (base_liquidable < 20200) {
    var tramo_3 = 0;
  } else {
    if (base_liquidable > 35200) {
      var tramo_3 = (35200 - 20200) * 0.3;
    } else {
      var tramo_3 = (base_liquidable - 20200) * 0.3;
    }
  }

  if (base_liquidable < 35200) {
    var tramo_4 = 0;
  } else {
    if (base_liquidable > 60000) {
      var tramo_4 = (60000 - 35200) * 0.37;
    } else {
      var tramo_4 = (base_liquidable - 35200) * 0.37;
    }
  }

  if (base_liquidable < 60000) {
    var tramo_5 = 0;
  } else {
    var tramo_5 = (base_liquidable - 60000) * 0.45;
  }

  return tramo_1 + tramo_2 + tramo_3 + tramo_4 + tramo_5;
}

function grossToNetSalary({ annualGrossSalary }: Props) {
  var num_decimales = 2;

  var bruto_anual = annualGrossSalary;
  var cuota_mensual_pagar = f_calcuar_cuota_mensual_pagar(bruto_anual);
  var cuota_acumulado_ano = cuota_mensual_pagar * 12;
  var rendimiento_neto = bruto_anual - cuota_acumulado_ano;
  var reduccion_rendimiento_neto =
    f_calcular_reduccion_rendimiento_neto(rendimiento_neto);

  var base_imponible =
    bruto_anual - cuota_acumulado_ano - reduccion_rendimiento_neto;

  var cuota_retencion = Number(
    (
      f_calcular_tramos_base_liquidable(base_imponible) -
      f_calcular_tramos_base_liquidable(5550)
    ).toFixed(num_decimales)
  );

  var tipo_previo = (cuota_retencion / bruto_anual) * 100;
  var importe_previo_retencion = Number(
    ((tipo_previo / 100) * bruto_anual).toFixed(num_decimales)
  );

  var tipo_final_retencion_truncado = Number(
    ((importe_previo_retencion / bruto_anual) * 100).toFixed(num_decimales)
  );
  if (tipo_final_retencion_truncado < 0) tipo_final_retencion_truncado = 0;
  var importe_final_retencion =
    (tipo_final_retencion_truncado / 100) * bruto_anual;

  var seguridad_social = cuota_acumulado_ano;

  var importe_retencion = importe_final_retencion;
  var sueldo_neto = bruto_anual - seguridad_social - importe_retencion;
  var sueldo_neto_12_pagas = sueldo_neto / 12;

  return {
    monthlyNetSalary: Number(sueldo_neto_12_pagas.toFixed(1)),
  };
}

export default grossToNetSalary;
