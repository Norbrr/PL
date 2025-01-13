public class Variable{
    
   public String tipo;
   public String nombre;

    public Variable(String tipo, String nombre){

        this.tipo=tipo;
        this.nombre=nombre;

    }
    
    
    public void SetValor(String val){
         this.nombre = val;
    }

    public void SetTipo(String val){
        this.tipo = val;
   }
    public String getValor(){
        return this.nombre;
    }

    public String getTipo(){
        return this.tipo;
    }
} 