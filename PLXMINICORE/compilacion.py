import subprocess
import os

# Solicitar archivo de entrada
archivoentrada = input("Archivo Entrada (sin extensión): ")

# Verificar existencia del archivo
if not os.path.exists(f"{archivoentrada}.plx"):
    print(f"Error: El archivo {archivoentrada}.plx no existe.")
    exit(1)

# Comandos
commands = [
    "chmod +x plxc",  # Asegura que el ejecutable 'plxc' tenga permisos de ejecución
    "jflex PLXC.flex",  # Genera el analizador léxico
    "cup PLXC.cup",  # Genera el parser
    "javac -cp java-cup-11b-runtime.jar *.java",  # Compila las clases generadas
    f"java -cp .:java-cup-11b.jar PLXC {archivoentrada}.plx {archivoentrada}.ctd",
    f"./ctd {archivoentrada}.ctd {archivoentrada}.txt",  # Ejecuta el parser
    f"./plxc {archivoentrada}.plx {archivoentrada}1.ctd",
    f"./ctd {archivoentrada}1.ctd {archivoentrada}.txt",  # Genera la salida de ejecución
]

# Ejecutar los comandos en orden
for i, cmd in enumerate(commands):
    print(f"Ejecutando: {cmd}")
    result = subprocess.run(cmd, shell=True)
    if result.returncode != 0:
        print(f"Error al ejecutar el comando {i + 1}: {cmd}")
        exit(1)

# Comprobación adicional
# try:
    # Comparar salidas si es necesario
 #    with open(f"{archivoentrada}.ctd", "r") as ctd_file:
 #        ctd_content = ctd_file.read()
  #   with open(f"{archivoentrada}1.txt", "r") as txt_file:
 #        txt_content = txt_file.read()
    
#     if ctd_content == txt_content:
 #        print("Todo correcto.")
#     else:
 #        print("Error: Las salidas no coinciden.")
# except FileNotFoundError as e:
 #    print(f"Error al abrir archivos de salida: {e}")
