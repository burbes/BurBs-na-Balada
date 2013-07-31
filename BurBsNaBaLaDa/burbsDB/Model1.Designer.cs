﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Data.EntityClient;
using System.ComponentModel;
using System.Xml.Serialization;
using System.Runtime.Serialization;

[assembly: EdmSchemaAttribute()]

namespace burbsDB
{
    #region Contexts
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    public partial class naelsonEntities : ObjectContext
    {
        #region Constructors
    
        /// <summary>
        /// Initializes a new naelsonEntities object using the connection string found in the 'naelsonEntities' section of the application configuration file.
        /// </summary>
        public naelsonEntities() : base("name=naelsonEntities", "naelsonEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        /// <summary>
        /// Initialize a new naelsonEntities object.
        /// </summary>
        public naelsonEntities(string connectionString) : base(connectionString, "naelsonEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        /// <summary>
        /// Initialize a new naelsonEntities object.
        /// </summary>
        public naelsonEntities(EntityConnection connection) : base(connection, "naelsonEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        #endregion
    
        #region Partial Methods
    
        partial void OnContextCreated();
    
        #endregion
    
        #region ObjectSet Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        public ObjectSet<Usuario> Usuarios
        {
            get
            {
                if ((_Usuarios == null))
                {
                    _Usuarios = base.CreateObjectSet<Usuario>("Usuarios");
                }
                return _Usuarios;
            }
        }
        private ObjectSet<Usuario> _Usuarios;

        #endregion
        #region AddTo Methods
    
        /// <summary>
        /// Deprecated Method for adding a new object to the Usuarios EntitySet. Consider using the .Add method of the associated ObjectSet&lt;T&gt; property instead.
        /// </summary>
        public void AddToUsuarios(Usuario usuario)
        {
            base.AddObject("Usuarios", usuario);
        }

        #endregion
    }
    

    #endregion
    
    #region Entities
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="naelsonModel", Name="Usuario")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class Usuario : EntityObject
    {
        #region Factory Method
    
        /// <summary>
        /// Create a new Usuario object.
        /// </summary>
        /// <param name="id_usuario">Initial value of the id_usuario property.</param>
        /// <param name="nome">Initial value of the nome property.</param>
        /// <param name="email">Initial value of the email property.</param>
        /// <param name="senha">Initial value of the senha property.</param>
        public static Usuario CreateUsuario(global::System.Int32 id_usuario, global::System.String nome, global::System.String email, global::System.String senha)
        {
            Usuario usuario = new Usuario();
            usuario.id_usuario = id_usuario;
            usuario.nome = nome;
            usuario.email = email;
            usuario.senha = senha;
            return usuario;
        }

        #endregion
        #region Primitive Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 id_usuario
        {
            get
            {
                return _id_usuario;
            }
            set
            {
                if (_id_usuario != value)
                {
                    Onid_usuarioChanging(value);
                    ReportPropertyChanging("id_usuario");
                    _id_usuario = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("id_usuario");
                    Onid_usuarioChanged();
                }
            }
        }
        private global::System.Int32 _id_usuario;
        partial void Onid_usuarioChanging(global::System.Int32 value);
        partial void Onid_usuarioChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String nome
        {
            get
            {
                return _nome;
            }
            set
            {
                OnnomeChanging(value);
                ReportPropertyChanging("nome");
                _nome = StructuralObject.SetValidValue(value, false);
                ReportPropertyChanged("nome");
                OnnomeChanged();
            }
        }
        private global::System.String _nome;
        partial void OnnomeChanging(global::System.String value);
        partial void OnnomeChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String email
        {
            get
            {
                return _email;
            }
            set
            {
                OnemailChanging(value);
                ReportPropertyChanging("email");
                _email = StructuralObject.SetValidValue(value, false);
                ReportPropertyChanged("email");
                OnemailChanged();
            }
        }
        private global::System.String _email;
        partial void OnemailChanging(global::System.String value);
        partial void OnemailChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String senha
        {
            get
            {
                return _senha;
            }
            set
            {
                OnsenhaChanging(value);
                ReportPropertyChanging("senha");
                _senha = StructuralObject.SetValidValue(value, false);
                ReportPropertyChanged("senha");
                OnsenhaChanged();
            }
        }
        private global::System.String _senha;
        partial void OnsenhaChanging(global::System.String value);
        partial void OnsenhaChanged();

        #endregion
    
    }

    #endregion
    
}