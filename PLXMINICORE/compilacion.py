import subprocess

# Comando de Compilacion
archivoentrada = input("Archivo Entrada: ")



command = "jflex PLXC.flex"  # Este comando muestra los archivos y directorios en formato largo
command2 = "cup PLXC.cup"
command3 = "javac -cp java-cup-11b-runtime.jar *.java"
command4 = f'''java -cp ".:java-cup-11b.jar" -debug PLXC {archivoentrada}.plx {archivoentrada}.ctd'''
command5 = f'''./ctd {archivoentrada}.ctd {archivoentrada}.txt'''

commandpl = f"./plxc {archivoentrada}.plx {archivoentrada}pl.ctd"
commandpl2 = f"./ctd {archivoentrada}.ctd"

comext = "chmod +x {archivoentrada}.plx"
# Ejecutar el comando
subprocess.run("chmod +x plxc", shell=True)
subprocess.run(command, shell=True)
subprocess.run(command2, shell=True)
subprocess.run(command3, shell=True)
subprocess.run(command4, shell=True)
res = subprocess.run(command5, shell=True)

#print(commandpl)
#subprocess.run(commandpl)
#res2 =subprocess.run(commandpl2)


#if res2.stdout == res.stdout:
 #   print ("Todo Correcto Mi negro")
#else:
#   print ("Faltal Cabroon")
