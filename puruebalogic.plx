int a;
int b;
int c;
a = 2;
b = 3;
c = 4;

if (a<b || (!b<c && c<a) || (a>c && c<b) && a>b) {
   a = 4;
   print(a*c);
}  

print(100);