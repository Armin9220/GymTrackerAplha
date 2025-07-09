package com.example.m223.gymtracker.security;

import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
* This class has 3 main functions:
* generateToken: create JWT Token from Auth object
* extractUserName: get username from JWT
* validateToken: validate a JWT with a secret
*/
@Component
public class JwtUtils {
private static final Logger logger =
LoggerFactory.getLogger(JwtUtils.class);
//aus application.properties
@Value("${myapp.jwtSecret}")
private String jwtSecret;
@Value("${myapp.jwtExpirationMs}")
private int jwtExpirationMs;
public String generateToken(UserDetailsImpl userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("roles", userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .toList());

    return Jwts.builder()
        .claims(claims)
        .subject(userDetails.getUsername())
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
        .signWith(getSignKey())
        .compact();
}


private Key getSignKey() {
 byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
 return Keys.hmacShaKeyFor(keyBytes);
}
public String extractUsername(String token) {
return extractClaim(token, Claims::getSubject);
}
public Date extractExpiration(String token) {
return extractClaim(token, Claims::getExpiration);
}
public <T> T extractClaim(String token, Function<Claims, T>
claimsResolver) {
final Claims claims = extractAllClaims(token);
return claimsResolver.apply(claims);
}
private Claims extractAllClaims(String token) {
return Jwts.parser()
.verifyWith((SecretKey)getSignKey())
.build()
 .parseSignedClaims(token)
.getPayload();
}
private Boolean isTokenExpired(String token) {
return extractExpiration(token).before(new Date());
}
public Boolean validateToken(String token){
return !isTokenExpired(token);
}
}