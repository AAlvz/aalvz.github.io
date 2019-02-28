#Dependencias.

Porque es importante mantenerlas actualizadas y compliables??

Para empezar es igual que un auto al que le dejamos de dar mantenimiento.
Que pasa si no le cambiamos el aceite? no le checamos los frenos? no cambiamos las llantas?

Lo mismo pasa en el código. Si es código que se planea utilizar en el futuro y seguirle dando
mantenimiento, se debe mantener actualizado. Porque? para evitar que falle cualquier cosa.
Y si algo llega a fallar, falle lo mas pronto posible para arreglarlo lo mas pronto posible.

Las dependencias tambien afectan directamente en el deploy y portabilidad. Si se dejan
sin tocar, se hace codigo legacy que despues es muy dificil mantener hasta que se hace
inservible. Porque? Porque querramos o no, todas las tecnologias van evoucionando, y por
tanto, no actualizarlas las va haciendo viejas.
Al hacer deploy, debe hacerse de manera ligera y solo con las dependencias necesarias.

El deploy debe ser indempotente y contstante. De otra manera como se puede automatizar? 

Dev vs Prod.

No se puede tener las mismas dependencias en desarrollo y produccion, ya que se hace pesado
y no tan seguro. 

Idealmente, hay una archivo donde se definen que' dependencias se utilizan en cada ambiente,
asi aseguramos un codigo limpio y apto para cada ambiente.


Prod Tools.

WAMPP, XAMPP, LAMPP no son herramientas de produccion. Ni si quiera es un web server per se.
Es una herramienta que sirve para simular un web server en un solo click. Que significa?
Que mantiene los paths defaults lo que hace que un ataque sea muy facil porque sabes justamente a donde ir , todas las configuraciones activas posibles (para asegurar que nada falle, activa todo lo que puede activar), lo que deja puertas vulnerables. en cuanto se descubre una nueva vulnerabilidad de cualquier paquete puede ser explotado.

Es como tener tu cuarto lleno de cosas que nisiquiera necesitas. No sabes que' tienes, y no lo puedes administrar. 

Esto provoca que no nos importe los paquetes que necesitamos en realidad. simplemente
instalamos todo y boom. Funciona. Lo cual no es buena practica al hacer mas pesado de inicio,
se dejan de hacer actualizaciones por conflictos que pueden suceder. 

Apache y Nginx son buenos web servers que deben ser configurados mas alla para tener un
control sobre produccion y que no se pueda accesar desde cualquier lugar al server.

aqui entra el manejo de usuarios y permisos.


