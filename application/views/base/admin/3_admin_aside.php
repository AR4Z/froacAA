       <!--sidebar start-->
      <aside>
          <div id="sidebar"  class="nav-collapse" role="navigation" aria-label="Barra de navegación FROAC">
              <!-- sidebar menu start-->
              <ul class="sidebar-menu" id="nav-accordion">
                  <li>
                      <a  href="<?php echo base_url()?>admin">
                          <i class="icon-dashboard"></i>
                          <span>Resume general</span>
                      </a>
                  </li>

                  <li>
                      <a href="<?php echo base_url()?>" >
                          <i class="icon-search"></i>
                          <span>Buscador</span>
                      </a>
                  </li>
                  <li class="sub-menu dcjq-parent-li">
                      <a href="javascript:;" class="dcjq-parent">
                          <i class="icon-sitemap"></i>
                          <span>Gestión de repositorios </span>
                          </a>
                      <ul class="sub" style="display: none;">
                          <li><a href="<?php echo base_url()?>repositorio/lista">Lista de Repositorios</a></li>
                          <li><a href="<?php echo base_url()?>repositorio/nuevo">Agregar Repositorios</a></li>

                      </ul>
                  </li>
                  <li>
                  <li class="sub-menu dcjq-parent-li">
                      <a href="javascript:;" class="dcjq-parent">
                          <i class="icon-sitemap"></i>
                          <span>Gestión de Usuarios </span>
                      </a>
                      <ul class="sub" style="display: none;">
                        <li><a href="<?php echo base_url()?>admin/lista_user">Lista de Usuarios </a></li>
                          <li><a href="<?php echo base_url()?>usuario/nuevo_usuario">Agregar Usuarios</a></li>
                      </ul>

                  </li>

                  <li>
                      <a href="javascript:;" >
                          <i class="icon-cogs"></i>
                          <span>Configuración</span>
                      </a>
                  </li>
                  <li>
                      <a href="javascript:;" >
                          <i class="icon-comment"></i>
                          <span>Blog</span>
                      </a>
                  </li>
                  <li>
                      <a href="javascript:;" >
                          <i class="icon-rss"></i>
                          <span>Noticias</span>
                      </a>
                  </li>
                  <li>
                      <a href="javascript:;" >
                          <i class="icon-info"></i>
                          <span>Acerca de</span>
                      </a>
                  </li>
                  <li>
                      <a href="<?php echo base_url()?>usuario/glosario" >
                          <i class="icon-user"></i>
                          <span>Glosario</span>
                      </a>
                  </li>

              </ul>
              <!-- sidebar menu end-->
          </div>
      </aside>
      <!--sidebar end-->
