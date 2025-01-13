import os;
import subprocess;

entrega = input("COMO SE VA A LLAMAR EL ARCHIVO ZIP?")

Comando = f"zip {entrega}.zip PLXC.cup PLXC.flex PLXC.java"

subprocess.run(Comando, True);