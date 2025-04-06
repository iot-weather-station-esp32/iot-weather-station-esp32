# IoT Weather Station (ESP32)

Este repositorio contiene todo lo necesario para construir y desplegar una estación meteorológica basada en una placa ESP32, con sensores de temperatura, humedad, presión, calidad de aire, etc. Incluye además la aplicación web para visualizar datos, documentación y diagramas.


## Tabla de contenidos

## Descripción general
El proyecto IoT Weather Station tiene como objetivo:
- Monitorear variables ambientales como temperatura, humedad, presión atmosférica y calidad del aire.
- Enviar los datos a una plataforma web para su visualización.
- Alimentarse de forma autónoma mediante un panel solar y batería recargable.
- Optimizar el consumo energético del ESP32 con modos de bajo consumo (Deep Sleep).

La aplicación web se basa en React y Firebase, permitiendo gráficos y tablas dinámicas de los valores registrados.


## Estructura de archivos

```bash
iot-weather-station-esp32/
├─ docs/
│  └─ diagrams/ # Carpeta para almacenar diagramas, imágenes, etc.
│       └─ flow-diagram.py # Script en Python para generar un diagrama de flujo con Graphviz.
│       └─ python-requirements.txt # Dependencias de Python para generar diagramas.
│
├─ firmware/
│  # Código fuente para el ESP32 (Arduino/PlatformIO, etc.)
│
├─ web-app/
│  # Aplicación web (React, Firebase, etc.)
│
└─ README.md
```

## Instalación y configuración
1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/iot-weather-station-esp32.git
```
2. Firmware
- Instalar las dependencias necesarias para la placa ESP32.
- Entrar en la carpeta firmware y compilar el código en tu ESP32.

## Generación de diagramas
Para generar el diagrama de flujo (o cualquier otro diagrama definido en flow-diagram.py):
1. Instalar Graphviz en tu sistema:
  - macOS: brew install graphviz
  - Ubuntu/Debian: sudo apt install graphviz
  - Windows: descarga desde la web oficial.
2. Instalar dependencias Python:
```bash
pip install -r python-requirements.txt
```
3.	Ejecutar el script:
```bash
python flow-diagram.py
```
## Créditos
Contribuidores
- Laura Matia Estepar
- Jaksumy Genesis Leon Galarza
- David Nieto González
- Andrei Ionut Hrisca
