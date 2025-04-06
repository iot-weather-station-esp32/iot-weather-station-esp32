from graphviz import Source

dot_code = """
digraph ESP32Flow {
    rankdir=TB
    bgcolor="#ffffff"
    node [shape=box style=filled fillcolor="#333333" fontcolor="white" color="white"];
    edge [color="black"];

    Inicio      [label="Inicio (Setup)\\n- Wi-Fi\\n- I2C\\n- Sensores"];
    Leer        [label="Leer Sensores\\n- BME280\\n- BH1750\\n- MQ-135"];
    Procesar    [label="Procesar Datos\\n- Filtrar\\n- Índices"];
    DeepSleep   [label="Deep Sleep\\n- Ahorro de energía"];
    Firebase    [label="Enviar a Firebase"];
    Usuario     [label="Lectura Usuario"];

    Inicio   -> Leer;
    Leer     -> Procesar;
    Procesar -> DeepSleep;
    Procesar -> Firebase;
    Firebase -> Usuario;
}
"""

graph = Source(dot_code)
graph.render('diagrama', view=True, format='png')