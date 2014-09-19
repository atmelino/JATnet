import graph;
import geometry;

unitsize(x=3cm);
real size=1.2;
xlimits( -size/2, size);
ylimits( -size/2, size);

real mu=0.2;
point pm1=(-mu,0);
point pm2=(1-mu,0);
point psc = (.5,.7);

xaxis("x",Ticks("%",Step=1),Arrow);
yaxis("y",Ticks("%",Step=1),Arrow);

labelx(1,2S);
labely(1,2W);
//labelx("$O$",0,SE);
dot((0,0));


path m1,m2,sc;
m1 = shift(pm1)*scale(.1)*unitcircle;
fill( m1,blue);
draw(Label("$m_1$",align=3*N),m1);
m2 = shift(pm2)*scale(.05)*unitcircle;
fill(m2, red);
draw(Label("$m_2$",align=3*NE),m2);
sc = shift(psc)*scale(.02)*unitcircle;
fill(sc, brown);
draw(Label("spacecraft",align=3*N),sc);

point pO=(0,-.3);
point pdm1 = (-mu,-.3);
point pdm2 = (1-mu,-.3);

distance(Label("$-\mu$",align=S),pO,pdm1,0mm);
distance(Label("$1-\mu$",align=S),pO,pdm2,0mm);

draw ("$r_1$",pm1--psc,dotted,Arrow);
draw ("$r_2$",pm2--psc,dotted,Arrow);

