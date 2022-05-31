import sys
import subprocess

# implement pip as a subprocess:
subprocess.check_call([sys.executable, '-m', 'pip', 'install','-r' ,sys.argv[1]+'requirements.txt'])