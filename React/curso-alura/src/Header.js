import React from 'react';

const Header = () => {
    return (
        <nav>
        <div class="nav-wrapper indigo lignten-2">
          <a href="/" class="brand-logo">Casa do código</a>
          <ul class="right">
            <li><a href="/author">Autores</a></li>
            <li><a href="/book">Livros</a></li>
            <li><a href="/about">Sobre</a></li>
          </ul>
        </div>
      </nav>
    );
}

export default Header;  