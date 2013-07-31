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
#region EDM Relationship Metadata

[assembly: EdmRelationshipAttribute("BurBsNaBaladaModel", "FK_Galeria_Eventos", "Eventos", System.Data.Metadata.Edm.RelationshipMultiplicity.One, typeof(BurBsNaBaLaDa.Models.Conexao.Eventos), "Galeria", System.Data.Metadata.Edm.RelationshipMultiplicity.Many, typeof(BurBsNaBaLaDa.Models.Conexao.Galeria), true)]

#endregion

namespace BurBsNaBaLaDa.Models.Conexao
{
    #region Contexts
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    public partial class BurBsNaBaladaEntities : ObjectContext
    {
        #region Constructors
    
        /// <summary>
        /// Initializes a new BurBsNaBaladaEntities object using the connection string found in the 'BurBsNaBaladaEntities' section of the application configuration file.
        /// </summary>
        public BurBsNaBaladaEntities() : base("name=BurBsNaBaladaEntities", "BurBsNaBaladaEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        /// <summary>
        /// Initialize a new BurBsNaBaladaEntities object.
        /// </summary>
        public BurBsNaBaladaEntities(string connectionString) : base(connectionString, "BurBsNaBaladaEntities")
        {
            this.ContextOptions.LazyLoadingEnabled = true;
            OnContextCreated();
        }
    
        /// <summary>
        /// Initialize a new BurBsNaBaladaEntities object.
        /// </summary>
        public BurBsNaBaladaEntities(EntityConnection connection) : base(connection, "BurBsNaBaladaEntities")
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
        public ObjectSet<Eventos> Eventos
        {
            get
            {
                if ((_Eventos == null))
                {
                    _Eventos = base.CreateObjectSet<Eventos>("Eventos");
                }
                return _Eventos;
            }
        }
        private ObjectSet<Eventos> _Eventos;
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        public ObjectSet<Galeria> Galeria
        {
            get
            {
                if ((_Galeria == null))
                {
                    _Galeria = base.CreateObjectSet<Galeria>("Galeria");
                }
                return _Galeria;
            }
        }
        private ObjectSet<Galeria> _Galeria;
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        public ObjectSet<sysdiagrams> sysdiagrams
        {
            get
            {
                if ((_sysdiagrams == null))
                {
                    _sysdiagrams = base.CreateObjectSet<sysdiagrams>("sysdiagrams");
                }
                return _sysdiagrams;
            }
        }
        private ObjectSet<sysdiagrams> _sysdiagrams;
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        public ObjectSet<Usuarios> Usuarios
        {
            get
            {
                if ((_Usuarios == null))
                {
                    _Usuarios = base.CreateObjectSet<Usuarios>("Usuarios");
                }
                return _Usuarios;
            }
        }
        private ObjectSet<Usuarios> _Usuarios;

        #endregion
        #region AddTo Methods
    
        /// <summary>
        /// Deprecated Method for adding a new object to the Eventos EntitySet. Consider using the .Add method of the associated ObjectSet&lt;T&gt; property instead.
        /// </summary>
        public void AddToEventos(Eventos eventos)
        {
            base.AddObject("Eventos", eventos);
        }
    
        /// <summary>
        /// Deprecated Method for adding a new object to the Galeria EntitySet. Consider using the .Add method of the associated ObjectSet&lt;T&gt; property instead.
        /// </summary>
        public void AddToGaleria(Galeria galeria)
        {
            base.AddObject("Galeria", galeria);
        }
    
        /// <summary>
        /// Deprecated Method for adding a new object to the sysdiagrams EntitySet. Consider using the .Add method of the associated ObjectSet&lt;T&gt; property instead.
        /// </summary>
        public void AddTosysdiagrams(sysdiagrams sysdiagrams)
        {
            base.AddObject("sysdiagrams", sysdiagrams);
        }
    
        /// <summary>
        /// Deprecated Method for adding a new object to the Usuarios EntitySet. Consider using the .Add method of the associated ObjectSet&lt;T&gt; property instead.
        /// </summary>
        public void AddToUsuarios(Usuarios usuarios)
        {
            base.AddObject("Usuarios", usuarios);
        }

        #endregion
    }
    

    #endregion
    
    #region Entities
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="BurBsNaBaladaModel", Name="Eventos")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class Eventos : EntityObject
    {
        #region Factory Method
    
        /// <summary>
        /// Create a new Eventos object.
        /// </summary>
        /// <param name="id_eventos">Initial value of the id_eventos property.</param>
        /// <param name="titulo">Initial value of the titulo property.</param>
        /// <param name="local">Initial value of the local property.</param>
        /// <param name="data">Initial value of the data property.</param>
        /// <param name="hora">Initial value of the hora property.</param>
        public static Eventos CreateEventos(global::System.Int32 id_eventos, global::System.String titulo, global::System.String local, global::System.DateTime data, global::System.TimeSpan hora)
        {
            Eventos eventos = new Eventos();
            eventos.id_eventos = id_eventos;
            eventos.titulo = titulo;
            eventos.local = local;
            eventos.data = data;
            eventos.hora = hora;
            return eventos;
        }

        #endregion
        #region Primitive Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 id_eventos
        {
            get
            {
                return _id_eventos;
            }
            set
            {
                if (_id_eventos != value)
                {
                    Onid_eventosChanging(value);
                    ReportPropertyChanging("id_eventos");
                    _id_eventos = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("id_eventos");
                    Onid_eventosChanged();
                }
            }
        }
        private global::System.Int32 _id_eventos;
        partial void Onid_eventosChanging(global::System.Int32 value);
        partial void Onid_eventosChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String titulo
        {
            get
            {
                return _titulo;
            }
            set
            {
                OntituloChanging(value);
                ReportPropertyChanging("titulo");
                _titulo = StructuralObject.SetValidValue(value, false);
                ReportPropertyChanged("titulo");
                OntituloChanged();
            }
        }
        private global::System.String _titulo;
        partial void OntituloChanging(global::System.String value);
        partial void OntituloChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String local
        {
            get
            {
                return _local;
            }
            set
            {
                OnlocalChanging(value);
                ReportPropertyChanging("local");
                _local = StructuralObject.SetValidValue(value, false);
                ReportPropertyChanged("local");
                OnlocalChanged();
            }
        }
        private global::System.String _local;
        partial void OnlocalChanging(global::System.String value);
        partial void OnlocalChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.DateTime data
        {
            get
            {
                return _data;
            }
            set
            {
                OndataChanging(value);
                ReportPropertyChanging("data");
                _data = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("data");
                OndataChanged();
            }
        }
        private global::System.DateTime _data;
        partial void OndataChanging(global::System.DateTime value);
        partial void OndataChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.TimeSpan hora
        {
            get
            {
                return _hora;
            }
            set
            {
                OnhoraChanging(value);
                ReportPropertyChanging("hora");
                _hora = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("hora");
                OnhoraChanged();
            }
        }
        private global::System.TimeSpan _hora;
        partial void OnhoraChanging(global::System.TimeSpan value);
        partial void OnhoraChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String descricao
        {
            get
            {
                return _descricao;
            }
            set
            {
                OndescricaoChanging(value);
                ReportPropertyChanging("descricao");
                _descricao = StructuralObject.SetValidValue(value, true);
                ReportPropertyChanged("descricao");
                OndescricaoChanged();
            }
        }
        private global::System.String _descricao;
        partial void OndescricaoChanging(global::System.String value);
        partial void OndescricaoChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.String img_icone
        {
            get
            {
                return _img_icone;
            }
            set
            {
                Onimg_iconeChanging(value);
                ReportPropertyChanging("img_icone");
                _img_icone = StructuralObject.SetValidValue(value, true);
                ReportPropertyChanged("img_icone");
                Onimg_iconeChanged();
            }
        }
        private global::System.String _img_icone;
        partial void Onimg_iconeChanging(global::System.String value);
        partial void Onimg_iconeChanged();

        #endregion
    
        #region Navigation Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("BurBsNaBaladaModel", "FK_Galeria_Eventos", "Galeria")]
        public EntityCollection<Galeria> Galeria
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedCollection<Galeria>("BurBsNaBaladaModel.FK_Galeria_Eventos", "Galeria");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedCollection<Galeria>("BurBsNaBaladaModel.FK_Galeria_Eventos", "Galeria", value);
                }
            }
        }

        #endregion
    }
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="BurBsNaBaladaModel", Name="Galeria")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class Galeria : EntityObject
    {
        #region Factory Method
    
        /// <summary>
        /// Create a new Galeria object.
        /// </summary>
        /// <param name="id_galeria">Initial value of the id_galeria property.</param>
        /// <param name="nome_arquivo">Initial value of the nome_arquivo property.</param>
        /// <param name="id_eventos">Initial value of the id_eventos property.</param>
        public static Galeria CreateGaleria(global::System.Int32 id_galeria, global::System.String nome_arquivo, global::System.Int32 id_eventos)
        {
            Galeria galeria = new Galeria();
            galeria.id_galeria = id_galeria;
            galeria.nome_arquivo = nome_arquivo;
            galeria.id_eventos = id_eventos;
            return galeria;
        }

        #endregion
        #region Primitive Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 id_galeria
        {
            get
            {
                return _id_galeria;
            }
            set
            {
                if (_id_galeria != value)
                {
                    Onid_galeriaChanging(value);
                    ReportPropertyChanging("id_galeria");
                    _id_galeria = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("id_galeria");
                    Onid_galeriaChanged();
                }
            }
        }
        private global::System.Int32 _id_galeria;
        partial void Onid_galeriaChanging(global::System.Int32 value);
        partial void Onid_galeriaChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String nome_arquivo
        {
            get
            {
                return _nome_arquivo;
            }
            set
            {
                if (_nome_arquivo != value)
                {
                    Onnome_arquivoChanging(value);
                    ReportPropertyChanging("nome_arquivo");
                    _nome_arquivo = StructuralObject.SetValidValue(value, false);
                    ReportPropertyChanged("nome_arquivo");
                    Onnome_arquivoChanged();
                }
            }
        }
        private global::System.String _nome_arquivo;
        partial void Onnome_arquivoChanging(global::System.String value);
        partial void Onnome_arquivoChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 id_eventos
        {
            get
            {
                return _id_eventos;
            }
            set
            {
                if (_id_eventos != value)
                {
                    Onid_eventosChanging(value);
                    ReportPropertyChanging("id_eventos");
                    _id_eventos = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("id_eventos");
                    Onid_eventosChanged();
                }
            }
        }
        private global::System.Int32 _id_eventos;
        partial void Onid_eventosChanging(global::System.Int32 value);
        partial void Onid_eventosChanged();

        #endregion
    
        #region Navigation Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [XmlIgnoreAttribute()]
        [SoapIgnoreAttribute()]
        [DataMemberAttribute()]
        [EdmRelationshipNavigationPropertyAttribute("BurBsNaBaladaModel", "FK_Galeria_Eventos", "Eventos")]
        public Eventos Eventos
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Eventos>("BurBsNaBaladaModel.FK_Galeria_Eventos", "Eventos").Value;
            }
            set
            {
                ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Eventos>("BurBsNaBaladaModel.FK_Galeria_Eventos", "Eventos").Value = value;
            }
        }
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [BrowsableAttribute(false)]
        [DataMemberAttribute()]
        public EntityReference<Eventos> EventosReference
        {
            get
            {
                return ((IEntityWithRelationships)this).RelationshipManager.GetRelatedReference<Eventos>("BurBsNaBaladaModel.FK_Galeria_Eventos", "Eventos");
            }
            set
            {
                if ((value != null))
                {
                    ((IEntityWithRelationships)this).RelationshipManager.InitializeRelatedReference<Eventos>("BurBsNaBaladaModel.FK_Galeria_Eventos", "Eventos", value);
                }
            }
        }

        #endregion
    }
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="BurBsNaBaladaModel", Name="sysdiagrams")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class sysdiagrams : EntityObject
    {
        #region Factory Method
    
        /// <summary>
        /// Create a new sysdiagrams object.
        /// </summary>
        /// <param name="name">Initial value of the name property.</param>
        /// <param name="principal_id">Initial value of the principal_id property.</param>
        /// <param name="diagram_id">Initial value of the diagram_id property.</param>
        public static sysdiagrams Createsysdiagrams(global::System.String name, global::System.Int32 principal_id, global::System.Int32 diagram_id)
        {
            sysdiagrams sysdiagrams = new sysdiagrams();
            sysdiagrams.name = name;
            sysdiagrams.principal_id = principal_id;
            sysdiagrams.diagram_id = diagram_id;
            return sysdiagrams;
        }

        #endregion
        #region Primitive Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.String name
        {
            get
            {
                return _name;
            }
            set
            {
                OnnameChanging(value);
                ReportPropertyChanging("name");
                _name = StructuralObject.SetValidValue(value, false);
                ReportPropertyChanged("name");
                OnnameChanged();
            }
        }
        private global::System.String _name;
        partial void OnnameChanging(global::System.String value);
        partial void OnnameChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 principal_id
        {
            get
            {
                return _principal_id;
            }
            set
            {
                Onprincipal_idChanging(value);
                ReportPropertyChanging("principal_id");
                _principal_id = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("principal_id");
                Onprincipal_idChanged();
            }
        }
        private global::System.Int32 _principal_id;
        partial void Onprincipal_idChanging(global::System.Int32 value);
        partial void Onprincipal_idChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 diagram_id
        {
            get
            {
                return _diagram_id;
            }
            set
            {
                if (_diagram_id != value)
                {
                    Ondiagram_idChanging(value);
                    ReportPropertyChanging("diagram_id");
                    _diagram_id = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("diagram_id");
                    Ondiagram_idChanged();
                }
            }
        }
        private global::System.Int32 _diagram_id;
        partial void Ondiagram_idChanging(global::System.Int32 value);
        partial void Ondiagram_idChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public Nullable<global::System.Int32> version
        {
            get
            {
                return _version;
            }
            set
            {
                OnversionChanging(value);
                ReportPropertyChanging("version");
                _version = StructuralObject.SetValidValue(value);
                ReportPropertyChanged("version");
                OnversionChanged();
            }
        }
        private Nullable<global::System.Int32> _version;
        partial void OnversionChanging(Nullable<global::System.Int32> value);
        partial void OnversionChanged();
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=false, IsNullable=true)]
        [DataMemberAttribute()]
        public global::System.Byte[] definition
        {
            get
            {
                return StructuralObject.GetValidValue(_definition);
            }
            set
            {
                OndefinitionChanging(value);
                ReportPropertyChanging("definition");
                _definition = StructuralObject.SetValidValue(value, true);
                ReportPropertyChanged("definition");
                OndefinitionChanged();
            }
        }
        private global::System.Byte[] _definition;
        partial void OndefinitionChanging(global::System.Byte[] value);
        partial void OndefinitionChanged();

        #endregion
    
    }
    
    /// <summary>
    /// No Metadata Documentation available.
    /// </summary>
    [EdmEntityTypeAttribute(NamespaceName="BurBsNaBaladaModel", Name="Usuarios")]
    [Serializable()]
    [DataContractAttribute(IsReference=true)]
    public partial class Usuarios : EntityObject
    {
        #region Factory Method
    
        /// <summary>
        /// Create a new Usuarios object.
        /// </summary>
        /// <param name="id_usuarios">Initial value of the id_usuarios property.</param>
        /// <param name="email">Initial value of the email property.</param>
        /// <param name="nome">Initial value of the nome property.</param>
        /// <param name="senha">Initial value of the senha property.</param>
        public static Usuarios CreateUsuarios(global::System.Int32 id_usuarios, global::System.String email, global::System.String nome, global::System.String senha)
        {
            Usuarios usuarios = new Usuarios();
            usuarios.id_usuarios = id_usuarios;
            usuarios.email = email;
            usuarios.nome = nome;
            usuarios.senha = senha;
            return usuarios;
        }

        #endregion
        #region Primitive Properties
    
        /// <summary>
        /// No Metadata Documentation available.
        /// </summary>
        [EdmScalarPropertyAttribute(EntityKeyProperty=true, IsNullable=false)]
        [DataMemberAttribute()]
        public global::System.Int32 id_usuarios
        {
            get
            {
                return _id_usuarios;
            }
            set
            {
                if (_id_usuarios != value)
                {
                    Onid_usuariosChanging(value);
                    ReportPropertyChanging("id_usuarios");
                    _id_usuarios = StructuralObject.SetValidValue(value);
                    ReportPropertyChanged("id_usuarios");
                    Onid_usuariosChanged();
                }
            }
        }
        private global::System.Int32 _id_usuarios;
        partial void Onid_usuariosChanging(global::System.Int32 value);
        partial void Onid_usuariosChanged();
    
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
